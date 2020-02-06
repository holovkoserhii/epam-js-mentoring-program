const KEY = "notes";

export const saveItemsToLocalStorage = notes =>
  notes && localStorage.setItem(KEY, notes);

export const getItemsFromLocalStorage = () => {
  const json = localStorage.getItem(KEY);
  return json && JSON.parse(json);
};

// export let removeDuplicatedObjects = arr =>
//   arr.reduce((accum, elem) => {
//     const needsAdding = accum.every(
//       el => el.id !== elem.id || el.text !== elem.text || el.title !== el.title
//     );
//     return needsAdding ? [...accum, elem] : accum;
//   }, []);

// export const mergeNoteSets = (setA, setB) => {
//   if (!setA) return setB;
//   if (!setB) return setA;
//   // eslint-disable-next-line no-console
//   console.log(setA);
//   // eslint-disable-next-line no-console
//   console.log(setB);
//   return removeDuplicatedObjects([...setA, ...setB]);
// };

// export const writeToStorage = notes => saveItemsToLocalStorage(notes);

// export const restoreFromStorage = notes =>
//   mergeNoteSets(notes, getItemsFromLocalStorage());
