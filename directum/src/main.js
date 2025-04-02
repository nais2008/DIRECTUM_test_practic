import DataTable from 'datatables.net-dt';

import './style.css'

const JSON_PATH = import.meta.env.VITE_JSON_PATH || "/data/data.json";


document.addEventListener("DOMContentLoaded", async function () {
  try {
      const response = await fetch(JSON_PATH);
      console.log(response);

      if (!response.ok) throw new Error("Ошибка загрузки JSON");

      const features = await response.json();

      new DataTable("#featuresTable", {
          data: features,
          columns: [
              { data: "name", title: "Наименование" },
              { data: "state", title: "Состояние", render: formatState },
              { data: "plannedHours", title: "Запланировано (ч)" },
              { data: "spentHours", title: "Затрачено (ч)" },
              { data: "deadline", title: "Срок", render: formatDate }
          ],
      });

  } catch (error) {
      console.error("Ошибка загрузки данных:", error);
  }
});

function formatState(state) {
  const states = {
      "Backlog": "Запланировано",
      "Process": "В работе",
      "Done": "Готово"
  };
  return states[state] || state;
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("ru-RU");
}

