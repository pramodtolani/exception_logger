import { sendRequest, BASE_URL } from "./common";

const EXCEPTIONS_LIST = `${BASE_URL}/`;
const MARK_AS_RESOLVED = `${BASE_URL}/resolve/`;

export const fetchExceptions = () =>
  sendRequest({
    method: "post",
    url: EXCEPTIONS_LIST,
    body: {},
  });

export const markAsResolved = ({ id }) =>
  sendRequest({
    method: "get",
    url: MARK_AS_RESOLVED + id,
  });
