const myTimeout = setTimeout(myGreeting, 20000);

function myGreeting() {
  const demo = document.getElementById("demo");
  const demo1 = document.getElementById("demo1");
  if (demo) demo.style.display = "none";
  if (demo1) demo1.style.display = "block";
}

function myStopFunction() {
  clearTimeout(myTimeout);
}
