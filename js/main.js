document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".input");
    const form = document.querySelector("form");
    const tasksDiv = document.querySelector(".tasks_list");
    const tasksArr = JSON.parse(localStorage.getItem("tasks")) || [];

    // app functionality
    function addTask(taskName) {
        let task = {
            id: Date.now(),
            name: taskName,
            finished: false,
        };
        tasksArr.push(task);
        renderTask(tasksArr);
        save(tasksArr);
        const tasks = document.querySelectorAll(".task")
        triggerTaskFinished(tasks, tasksArr)
    }

    function renderTask(tasksArr) {
        tasksDiv.innerHTML = "";
        if (typeof tasksArr !== "string") {
            for (let i = 0; i < tasksArr.length; i++) {
                if (tasksArr.length !== 0) {
                    tasksDiv.innerHTML += `
                    <div class="task" data-id=${tasksArr[i].id}>
                        <span>${tasksArr[i].name}</span>
                    </div>
                 `;
                }
            }
        } else {
            tasksDiv.innerHTML = `<center>${tasksArr}</center>`;
        }
    }

    function save(tasksArr) {
        localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }

    function deleteTask(taskId, tasksArr) {
        for (let i = 0; i < tasksArr.length; i++) {
            if (tasksArr[i].id == taskId) {
                tasksArr.splice(i, 1);
                console.log("task deleted successfully" + tasksArr.length);
                save(tasksArr);
                if (tasksArr.length === 0) {
                    renderTask("there is no tasks to show!");
                }
            }
        }
    }

    function triggerTaskFinished(tasks, tasksArr) {
        tasks.forEach((i) => {
            i.addEventListener('click', () => {
                i.classList.toggle("finished")
                for (let j = 0; j < tasksArr.length; j++) {
                    if (i.dataset.id == tasksArr[j].id) {
                        tasksArr[j].finished = !tasksArr[j].finished;
                        save(tasksArr);
                    }
                }
            })
        })
    }

    function deleteFinishedTasks(tasksArr) {
        let filteredTasks = tasksArr.filter(task => !task.finished)
        save(filteredTasks)
        renderTask(filteredTasks)
    }

    // event Listeners
    form.onsubmit = function (e) {
        if (input.value) {
            e.preventDefault();
            addTask(input.value);
            input.value = "";
        }
    };

    window.onload = function () {
        input.focus();

        if (localStorage.getItem("tasks")) {
            if (JSON.parse(localStorage.getItem("tasks")).length !== 0) {
                renderTask(JSON.parse(localStorage.getItem("tasks")));
                deleteFinishedTasks(tasksArr);
                const tasks = document.querySelectorAll(".task")
                triggerTaskFinished(tasks, tasksArr);
            } else {
                renderTask("there is no tasks to show!");
            }
        } else {
            renderTask("there is no tasks to show!");
        }
    };

    // display user name
    const userName = "Jana";
    document.querySelector(".welcome").textContent += ` ${userName}🥳🤩!`;
})
