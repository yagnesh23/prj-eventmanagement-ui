export function recursiveDeepCopy(objectToBeCopied: any): any {
  let copiedObject: any, i: any;

  if (typeof objectToBeCopied !== 'object') {
    return objectToBeCopied;
  }
  if (!objectToBeCopied) {
    return objectToBeCopied;
  }

  if ('[object array]' === Object.prototype.toString.apply(objectToBeCopied)) {
    copiedObject = [];
    for (i = 0; i < objectToBeCopied.length; i++) {
      copiedObject[i] = recursiveDeepCopy(objectToBeCopied[i]);
    }
    return copiedObject;
  }

  copiedObject = {} as { [key: string]: any };
  for (i in objectToBeCopied) {
    if (objectToBeCopied.hasOwnProperty(i)) {
      copiedObject[i] = recursiveDeepCopy(objectToBeCopied[i]);
    }
  }
  return copiedObject;
}
