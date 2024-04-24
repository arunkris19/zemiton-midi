import Utils from "./utils.js";

class Tempo {
  static SLOW = Utils.RandomInt(95, 80);
  static MEDIUM = Utils.RandomInt(115, 95);
  static FAST = Utils.RandomInt(141, 115);
}
export default Tempo;
