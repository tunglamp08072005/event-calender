import moment from "moment";

export const prepareEvents = (events = []) =>
  events.map(({ _id, start, end, ...rest }) => ({
    ...rest,
    id: _id,
    start: moment(start).toDate(),
    end: moment(end).toDate(),
  }));
