/* eslint-disable prefer-const */
import { AppHeadersConstant } from './../util/appHeadersConstant';
import {
  HttpService,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ResponseEnum } from 'src/config/response.config';
import ExtendedRequest from 'src/interface/extended-request';
import { IUserIdentityCompositeObj } from 'src/interface/user-identity-composite-obj';
import { customResponse } from 'src/util/custom-response';
import { I18nTranslate } from 'src/util/i18n-translate';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private readonly i18nTranslateUtil: I18nTranslate,
    private httpService: HttpService,
  ) {}
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    let currentLanguage;
    try {
      let {
        authorization,
        [AppHeadersConstant.ACCEPT_LANGUAGE]: acceptLanguage,
        [AppHeadersConstant.BASE_PRODUCT_HEADER_KEY]: currentProduct,
        [AppHeadersConstant.BASE_ORG_HEADER_KEY]: currentOrg,
        [AppHeadersConstant.BASE_BRANCH_KEY]: currentBranch,
        [AppHeadersConstant.BASE_PRODUCT_USER_CATEGORY_NAME_KEY]: currentUserType,
      } = req.headers;

      if (!acceptLanguage) {
        acceptLanguage = 'en-US';
      }

      if (acceptLanguage) {
        const langCode = (acceptLanguage as string).split('-')[0];
        req.acceptLanguageCode = langCode;
        currentLanguage = langCode;
      }

      if (
        currentProduct === undefined &&
        currentOrg === undefined &&
        currentBranch === undefined
      ) {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            customResponse(
              ResponseEnum.UNAUTHORISED.code,
              await this.i18nTranslateUtil.translate(
                'onboarding.MESSAGES.REQUIRED_HEADER_MISSEN',
                req.acceptLanguageCode,
              ),
              [],
            ),
          );
      }

      const userIdentityCompositeKey: IUserIdentityCompositeObj = {
        currentProduct: currentProduct as string,
        currentOrg: currentOrg as string,
        currentBranch: currentBranch as string,
        currentUserType: currentUserType as string,
      };

      req.userIdentityCompositeKey = userIdentityCompositeKey;

      if (!authorization) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json(
            customResponse(
              ResponseEnum.FAILED_AUTHENTICATION.code,
              await this.i18nTranslateUtil.translate(
                'onboarding.MESSAGES.FAILED_AUTHENTICATION',
                currentLanguage,
              ),
              [],
            ),
          );
      } else {
        const [authType, token] = authorization.split(' ');
        if (!token || authType !== 'Bearer') {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json(
              customResponse(
                ResponseEnum.FAILED_AUTHENTICATION.code,
                await this.i18nTranslateUtil.translate(
                  'onboarding.MESSAGES.FAILED_AUTHENTICATION',
                  currentLanguage,
                ),
                [],
              ),
            );
        }

        // console.log(process.env['AUTH_ISSUER']);

        // Hit the auth service to confirm token
        const response = await this.httpService
          .post(`${process.env['AUTH_ISSUER']}`, {
            authToken: token,
            loginMode:
              `${process.env['AUTH_LOGIN_MODE']}` ||
              'MONGO-DATABASE-LOGIN-MODE',
          })
          .toPromise();

        if (response && response.data.code == 0 && response.data.valid) {
          if (!response.data.user) {
            throw new NotFoundException(
              await this.i18nTranslateUtil.translate(
                'onboarding.MESSAGES.NO_AUTH_USER',
                currentLanguage,
              ),
            );
          } else {
            req.user = response.data.user;
            next();
          }
        } else {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json(
              customResponse(
                ResponseEnum.UNAUTHORISED.code,
                await this.i18nTranslateUtil.translate(
                  'onboarding.MESSAGES.UNAUTHORISED_TOKEN',
                  currentLanguage,
                ),
                [],
              ),
            );
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(
        await this.i18nTranslateUtil.translate(
          'onboarding.MESSAGES.TOKEN_INTERNAL_SERVER_ERROR',
          currentLanguage,
        ),
        error,
      );
    }
  }
}
