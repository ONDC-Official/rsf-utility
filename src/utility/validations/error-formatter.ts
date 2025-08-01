export const formatAjvErrors = (errors: any[] = []) => {
  const filtered = errors.filter(
    (e) => !['not', 'oneOf', 'anyOf', 'allOf', 'if', 'then', 'else'].includes(e.keyword)
  );

  const formatted = filtered.map((e) => ({
    message: `${e.message}${e.params?.allowedValues ? ` (${e.params.allowedValues})` : ''}${
      e.params?.allowedValue ? ` (${e.params.allowedValue})` : ''
    }${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`,
    details: e.instancePath,
  }));

  return {
    status: formatted.length === 0 ? 'pass' : 'fail',
    errors: formatted,
  };
};
