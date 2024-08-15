import dayjs from "dayjs";

import "dayjs/locale/pt-br";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

export { dayjs };
