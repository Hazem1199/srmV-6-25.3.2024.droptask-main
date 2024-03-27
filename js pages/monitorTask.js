var loadingDiv = document.querySelector(".loading-div");
const tableBody = document.querySelector(".tbodyTask");

// link shhet : https://docs.google.com/spreadsheets/d/1-ctOf4DgYl2m2yeXwrjU2WXV8Nc7VL_NbftWGz2tLXg/edit#gid=350245505
async function getTasks() {
  const baseUrl = `https://srm-vbc7.onrender.com/api/today-tasks`;
  const token =
    "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch(baseUrl, { headers });
    const data = await response.json();
    console.log(data.data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// async function getreportedTasks() {
//   const baseUrl = `https://srm-vbc7.onrender.com/api/task-reports`;
//   const token =
//     "f2004377863e9d767b12ed40b2a996ff71343b463323b990160adf52f660493e20e77b5f368d4f510a3f9a0ccb3bb2cbed5b8c8a6800c63d768eed032bf0eeeb030cfab84d2167ca498673aeb6528147a103989c27e944e87768be0b2b6c65f5f8ad994a831150e8bce9bbf650261d17cf5f5db8e03182ea2faec183d1ec11de";
//   const headers = {
//     Authorization: `Bearer ${token}`,
//   };
//   try {
//     const response = await fetch(baseUrl, { headers });
//     const data = await response.json();
//     console.log(data.data[0].attributes);
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// }

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
  loadingDiv.style.display = "block";
  overlay.style.display = "block";
}

function hide() {
  overlay.style.display = "none";
  loadingDiv.style.display = "none";
}

const taskPush = [];

console.log(taskPush);

async function displayTasks() {
  change();

  // const reportedTasks = await getreportedTasks();

  // console.log(reportedTasks.data);

  const tasks = await getTasks();

  // if (!tasks || !Array.isArray(tasks)) {
  //   console.error("Invalid or undefined tasks array");
  //   return;
  // }

  tableBody.innerHTML = "";
  console.log(tableBody.childNodes);

  const Dep = localStorage.getItem("myDepartment");

  for (let i = 0; i < tasks.data.length; i++) {
      let task = {
        id: tasks.data[i].id,
        TaskNo: tasks.data[i].attributes.task_no,
        TaskName: `<a target="_blank" href="${tasks.data[i].attributes.task_des_link}">${tasks.data[i].attributes.task_name}</a>`,
        Department: tasks.data[i].attributes.department,
        Responsible: tasks.data[i].attributes.responsible,
        TaskDesLink: tasks.data[i].attributes.task_des_link,
        Type: tasks.data[i].attributes.type,
        Days: tasks.data[i].attributes.days,
        From: tasks.data[i].attributes.fromm,
        To: tasks.data[i].attributes.too,
        emp: tasks.data[i].attributes.emp,
        note: tasks.data[i].attributes.note,
        report: tasks.data[i].attributes.report,
        task_completion: tasks.data[i].attributes.task_completion,
      };

      if (task.emp === null) {
        task.emp = "";
      }

      if (task.note === null) {
        task.note = "";
      }

      if (task.report === null) {
        task.report = "";
      }

      if (task) {
        taskPush.push(task);
      }

      // console.log(typeof task.From);

      var newRow = document.createElement("tr");

      const formattedTime = new Date(task.From).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedTime1 = new Date(task.To).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // const formattedLateness = new Date(task.Lateness).toLocaleTimeString("en-US", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // });

      // const formattedEndTime = new Date(task.To).toISOString().slice(0, 19).replace('T', ' ');

      // currant = new Date();
      // const currantTime = currant.toLocaleTimeString("en-US", {
      //   hour: "2-digit",
      //   minute: "2-digit",
      // });

      const myDate = new Date().getHours() < new Date(task.To).getHours();
      if (myDate === true) {
        newRow.style.backgroundColor = "lightgreen";
      }
      // console.log( myDate)
      // console.log(currantTime.split(":")[0]);

      const timeVariance =
        new Date(task.Lateness).getHours() +
        ":" +
        new Date(task.Lateness).getMinutes();
      // console.log(new Date(task.To).getHours().valueOf());
      // const myDate = new Date(task.To).getHours().valueOf() - new Date().getHours().valueOf();
      // console.log(new Date(task.To).getHours().valueOf() + " - " + new Date().getHours().valueOf() + " = " + myDate);
      // if (myDate >= 1) {
      //   newRow.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
      // }

      // function computeTimeVariance(taskEndTime) {
      //   const currentTime = new Date();
      //   const endTime = new Date(taskEndTime);
      //   let timeDifference = new Date(endTime - currentTime);

      //   let sign = '';
      //   if (timeDifference < 0) {
      //     sign = '-';
      //     timeDifference.setSeconds(timeDifference.getSeconds() * -1);
      //   }

      //   let hours = timeDifference.getUTCHours() % 12 || 12;
      //   const minutes = timeDifference.getUTCMinutes().toString().padStart(2, '0');
      //   const seconds = timeDifference.getUTCSeconds().toString().padStart(2, '0');

      //   hours = hours.toString().padStart(2, '0');

      //   return `${sign}${hours}:${minutes}:${seconds} `;
      // }

      // const taskEndTime = '09:00:00'; // 9:00:00 PM
      // const timeVariance = computeTimeVariance(taskEndTime);
      // console.log(timeVariance);

      const userr = localStorage.getItem("myCode");

      newRow.innerHTML = `

        <td class="text-center align-middle d-flex align-items-center">
        <div style="font-size: 14px;" class="fw-bold mx-1">
            (${task.TaskNo})
        </div>
        <div style="direction: rtl" class="fw-bold">
            ${task.TaskName}
        </div>
      </td>
      <td class="text-center align-middle fw-bold">${task.Department}</td>
      <td class="text-center align-middle fw-bold" style="font-size: 10px">${task.From}</td>
      <td class="text-center align-middle fw-bold" style="font-size: 10px">${task.To}</td>
      <td class="text-center align-middle fw-bold">${task.report}</td>
      <td class="text-center align-middle fw-bold">${task.note}</td>

      <td class="text-center align-middle fw-bold">${task.emp}</td>

      `;

      let reportBtn = newRow.querySelector("#reportBtn");

      const myDate2 = new Date().getHours() < new Date(task.From).getHours();
      if (myDate2 === true) {
        reportBtn.style.display = "none";
      }

      let follow = newRow.querySelector(".follow");
      let notDone = newRow.querySelector(".notDone");
      let done = newRow.querySelector(".done");
      // console.log(follow);

      let frmTaskReport = document.querySelector("#frmTaskReport");
      // console.log(frmTaskReport);

      let selectStatus = newRow.querySelector("#selectStatus");
      let Range = newRow.querySelector(".Range");

      // console.log(reportBtn.childNodes[1]);
      // let iconReport = reportBtn.childNodes[1];
      let reportSubmitBtn = newRow.querySelector(".reportSubmitBtn");

      const iconsInRow = newRow.querySelectorAll(".qrIcon");

    

      // if (reportBtn.classList.contains("btn-warning")) {
      //   follow.classList.remove("d-block");
      //   notDone.classList.add("d-block");
      // }

      

      // if (reportBtn.classList.contains('btn-warning')) {
      // }

      // console.log(Range);
      

      //   reportSubmitBtn.addEventListener("click", async () => {
      //     // Simulate AJAX request success
      //     for (let i = 0; i < tableBody.childNodes.length; i++) {
      //       tableBody.childNodes[i].style.color = "green";
      //     }
      //   });

      tableBody.appendChild(newRow);
    
  }



  // Hide the loading overlay once the requests are processed
  hide();
}

displayTasks();

window.addEventListener("load", function () {
  if (
    localStorage.getItem("myCode") === "" ||
    localStorage.getItem("myCode") === null
  ) {
    // Redirect to index.html
    window.location.href = "index.html";
  }
});
