export function randomArray() {
  Array.prototype.shuffle = function (b) {
    let i = this.length,
      j,
      t;

    while (i) {
      j = Math.floor(i-- * Math.random());
      t =
        b && typeof this[i].shuffle !== "undefined"
          ? this[i].shuffle()
          : this[i];
      this[i] = this[j];
      this[j] = t;
    }
    return this;
  };
}
