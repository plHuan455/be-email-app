import React from "react";

interface useAutoCompleteReceiveProps<T, F extends ReadonlyArray<string>> {
  options: T[];
  fields: F;
  filterFunc?: (field: F[number]) => (option: T) => boolean;
}

type useAutoCompleteReceiveTypes<
  T,
  F extends ReadonlyArray<string>,
> = ObjectFromList<F, useAutoCompleteReceiveValue<T>> & {
  onUpdate: () => void;
};

type ObjectFromList<T extends ReadonlyArray<string>, V> = {
  [K in T extends ReadonlyArray<infer U> ? U : never]: V;
};

type useAutoCompleteReceiveValue<T> = {
  options: T[];
};

function useAutoCompleteReceive<T, F extends ReadonlyArray<string>>(
  props: useAutoCompleteReceiveProps<T, F>,
): useAutoCompleteReceiveTypes<T, F>;
function useAutoCompleteReceive<T, F extends ReadonlyArray<string>>({
  options,
  fields,
  filterFunc
}: useAutoCompleteReceiveProps<T, F>){
  const defaultResult = React.useMemo(() => {
    return fields.reduce((cur, next) => {
      cur[next] = { options: options };
      return cur
    }, {});
  }, [fields, options])
  
  const [result, setResult] = React.useState(defaultResult);

  const onUpdate = () => {
    const result = fields.reduce((cur, next) => {
      if (!filterFunc) {
        cur[next] = { options: options };
        return cur
      }
  
      const filter = filterFunc(next)
      cur[next] = { options: options.filter(filter) };
      return cur
    }, {});

    setResult(result)
  }

  React.useEffect(() => {
    onUpdate()
  }, [fields, filterFunc, options])
  

  return {
    onUpdate,
    ...result
  };
}

export default useAutoCompleteReceive;
