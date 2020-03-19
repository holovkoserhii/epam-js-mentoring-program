const message = document.getElementById("message");
const name = document.getElementById("name");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");
const heading = document.getElementById("notesNumber");
const allConnections = document.getElementById("other-users");

name.value = "";
message.value = "";

// this is how additional parameters can be sent on connection
const socket = io.connect(`http://localhost:7171`, {
  query: `name=${name.value}`
});

function changeName() {
  socket.emit("changeName", name.value);
}
const debouncedChangeName = debounced(1000, changeName);

function StopShowTyping() {
  feedback.innerHTML = ``;
}

const debouncedStopShowTyping = debounced(1000, StopShowTyping);

btn.addEventListener("click", () => {
  socket.emit("message", {
    message: message.value,
    name: name.value
  });
  message.value = "";
});

message.addEventListener("keyup", () => {
  socket.emit("typing", name.value);
});

name.addEventListener("keyup", debouncedChangeName);

socket.on("message", data => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.name}</strong> ${data.message}</p>`;
});

socket.on("typing", data => {
  feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
  debouncedStopShowTyping();
});

socket.on("reportAllConnections", data => {
  console.log(data.connections);
  const allConnectionsMarkup =
    data.connections.reduce((accum, elem) => {
      return (accum += `<li>${elem.login || "guest"} - ${
        elem.notesCount
      } notes</li>`);
    }, "<ul>") + "</ul>";
  allConnections.innerHTML = allConnectionsMarkup;
  const myConnection = data.connections.find(
    connection => connection.login === name.value
  );
  if (!myConnection.login && !myConnection.notesCount)
    return (heading.innerHTML = "Chat");
  heading.innerHTML = `<strong>${myConnection.login}</strong>`;
});

// helpers

function debounced(delay, fn) {
  let timerId;
  return function(...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
