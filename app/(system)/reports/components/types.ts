export type IncidentCountForChart = {
  CLOSED: Data;
  IN_PROGRESS: Data;
  OPEN: Data;
};

export type Data = {
  label: string;
  data: {
    label: string;
    data: number;
  }[];
};
