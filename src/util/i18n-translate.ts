import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class I18nTranslate {
  constructor(private readonly i18n: I18nService) {}

  public async translate(
    key: string,
    acceptLanguage: string,
    fallbackLang = 'en',
  ): Promise<string> {
    const result = await this.i18n.translate(key, {
      lang: acceptLanguage || fallbackLang,
    });

    return result;
  }
}
