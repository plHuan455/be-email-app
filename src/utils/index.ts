export function mapModifiers(
  baseClassName: string,
  ...modifiers: (string | string[] | false | undefined)[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]),
      [],
    )
    .map((m) => `-${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${baseClassName}${suffix}`,
      baseClassName,
    );
}

export function mapModifiersTailWind(
  baseClassName: string = '',
  ...modifiers: (
    | string
    | string[]
    | false
    | undefined
    | GlobalTailWindClassName
    | Modifiers
  )[]
): string {
  return modifiers
    .reduce<string[]>(
      (acc, m) => (!m ? acc : [...acc, ...(typeof m === 'string' ? [m] : m)]),
      [],
    )
    .map((m) => `${m}`)
    .reduce<string>(
      (classNames, suffix) => `${classNames} ${suffix}`,
      baseClassName,
    );
}

export const listAlphabet = (() => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return alphabet;
})();

const utils = {
  mapModifiers,
  mapModifiersTailWind,
  listAlphabet,
};

export default utils;
