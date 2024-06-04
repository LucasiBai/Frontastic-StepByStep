export class StringTemplate {
  static resolve(templateString: string, templateVariables: Object, encodeVariable?: boolean): string {
    for (const variableLabel of Object.keys(templateVariables)) {
      const placeholder = new RegExp('\\${' + variableLabel + '}', 'g');
      templateString = templateString.replace(
        placeholder,
        encodeVariable
          ? encodeURIComponent(templateVariables[variableLabel as keyof object])
          : templateVariables[variableLabel as keyof object],
      );
    }
    return templateString;
  }
}
