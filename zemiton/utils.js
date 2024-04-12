class Utils {
  static PAUSE = ':';

  /**
   * 
   * @param {*} max 
   * @param {*} min 
   * @returns number
   */
  static RandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * 
   * @returns number, random sort order
   */
  static RandomSort() {
    return [-1, 0, 1][Utils.RandomInt(3)];
  }
  /**
   * 
   * @param {*} phrase 
   * @returns array
   */
  
  static randomize = (list) => {
    const nl = [...list];
    const i = Utils.RandomInt(nl.length);
    nl[i] = nl[i].split('').reverse().join('');
    return nl;
  };

  static SplitStringIntoArray(string) {
    const halfLength = Math.ceil(string.length / 2);
    const array = [];
    for (let i = 0; i < string.length; i += halfLength) {
        array.push(string.substr(i, halfLength));
    }
    return array;
}

  
}

export default Utils;