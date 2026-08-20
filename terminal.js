$(function () {
  $('.prompt').html('mohamed@portfolio:~$ ');
  var term = new Terminal('#input-line .cmdline', '#container output');
  term.init();
});

var Terminal = Terminal || function (cmdLineSelector, outputSelector) {
  var input = document.querySelector(cmdLineSelector);
  var output = document.querySelector(outputSelector);
  var history = [];
  var historyPosition = 0;
  var commands = ['whoami', 'experience', 'education', 'skills', 'languages', 'interests', 'contact', 'help', 'clear'];

  window.addEventListener('click', function () { input.focus(); });
  input.addEventListener('keydown', function (event) {
    if (event.keyCode === 38) {
      historyPosition = Math.max(0, historyPosition - 1);
      input.value = history[historyPosition] || '';
      return;
    }
    if (event.keyCode === 40) {
      historyPosition = Math.min(history.length, historyPosition + 1);
      input.value = history[historyPosition] || '';
      return;
    }
    if (event.keyCode !== 13) return;

    var command = input.value.trim().toLowerCase();
    if (command) {
      history.push(command);
      historyPosition = history.length;
      output.insertAdjacentHTML('beforeend', '<p><span class="prompt">mohamed@portfolio:~$</span> ' + escapeHtml(command) + '</p>');
    }

    if (command === 'clear') output.innerHTML = '';
    else if (command) render(command);
    input.value = '';
    window.scrollTo(0, document.body.scrollHeight);
  });

  function render(command) {
    var responses = {
      help: '<h2>Available commands</h2><p>' + commands.join(' · ') + '</p>',
      whoami: '<h2>Mohamed EN-NASSIBI</h2><p>Software engineer working on backend systems, CI infrastructure, developer tooling, and automation. Based in Casablanca and fluent in Arabic, English, French, and Dutch.</p>',
      experience: '<h2>Experience</h2><h3>Junior Member of Technical Staff · Oracle · Jul 2024 — now</h3><p>Building Java/Micronaut services and CI infrastructure for the GraalVM team: orchestration, host agents, VM lifecycle, Redis-backed scheduling, dashboards, REST APIs, and Kubernetes/OCI operations.</p><h3>Research Assistant · Oracle · Jan — Jul 2024</h3><p>Built queueing services for macOS CI workloads and automated release and backport workflows with Python and Bash.</p><h3>Research Assistant · Oracle · Jul — Sep 2023</h3><p>Created test visualization and code coverage tooling with Micronaut and React.</p>',
      education: '<h2>Education</h2><p>Engineer’s degree in Software Engineering<br>Ecole Nationale des Sciences Appliquées Al Hoceima · 2024</p>',
      skills: '<h2>Skills</h2><p><b>Languages:</b> Java, Python, TypeScript, JavaScript, Bash, SQL, C#, C/C++<br><b>Backend:</b> Micronaut, Spring, Helidon, REST APIs, microservices<br><b>Platform:</b> Docker, Kubernetes, OKE, OCI, GitHub Actions, GitLab CI/CD, GraalVM Native Image<br><b>Data:</b> Redis, Oracle Database, MongoDB, Cassandra</p>',
      languages: '<h2>Languages</h2><p>Arabic · fluent<br>English · professional<br>French · fluent<br>Dutch · native</p>',
      interests: '<h2>Interests</h2><p>Distributed systems, developer experience, performance, automation, observability, and learning how complex systems work.</p>',
      contact: '<h2>Contact</h2><p>Email: <a href="mailto:mohamed.enn2001@gmail.com">mohamed.enn2001@gmail.com</a><br>Website: moenn1.github.io</p>'
    };
    output.insertAdjacentHTML('beforeend', '<p>' + (responses[command] || escapeHtml(command) + ': command not found — type help') + '</p>');
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character];
    });
  }

  return { init: function () { output.insertAdjacentHTML('beforeend', '<h1>Mohamed EN-NASSIBI</h1><h3>Software Engineer</h3><p>Welcome. Type <b>help</b> to explore my profile.</p>'); } };
};
