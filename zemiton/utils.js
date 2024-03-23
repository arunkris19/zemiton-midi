class Utils {
  static RandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  static RandomSort() {
    return [-1, 0, 1][Utils.RandomInt(3)];
  }
}

export default Utils;