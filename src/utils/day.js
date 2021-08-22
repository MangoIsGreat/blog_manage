import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

// 全局过滤器：处理相对时间
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});

// 全局过滤器：格式化时间
Vue.filter("formatTime", (value) => {
  return dayjs(value).format("YYYY-MM-DD");
});
