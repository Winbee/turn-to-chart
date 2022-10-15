export interface Dimension {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  chart: {
    width: number;
    height: number;
  };
}
