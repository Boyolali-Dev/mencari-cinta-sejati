export const convertObjectToArray = (object: { [key: string]: any}): any[] => {
    return Object.values(object);
  };