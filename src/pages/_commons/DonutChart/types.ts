export interface ItemLegendProps {
    title: string;
    color: string;
    value: number;
  }

export interface DonutChartProps {
  title?: string;
  colorLabels: Array<string>;
  labelsItem: Array<string>;
  dataCharts: Array<DataChart>;
  styleContainer?: React.CSSProperties;
  containerClassName?: string;
}

export interface DataChart {
  label: string;
  data: Array<number>;
}
