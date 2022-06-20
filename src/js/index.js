'use strict';

const navigateSection = (evt) => {
  const targetLink = evt.target.dataset.link;
  if (!targetLink) return;
  scrollToSection(targetLink);
};

const scrollToSection = (sectionId) => {
  const targetSection = document.querySelector(sectionId);
  targetSection.scrollIntoView({ behavior: 'smooth' });
};

const navList = document.querySelector('.nav-list');
const readMore = document.querySelector('.read-more');
navList.addEventListener('click', navigateSection);
readMore.addEventListener('click', navigateSection);

const getProjectInfo = async () => {
  const projectInfo = await fetch('src/data/projects.json');
  const infoJson = await projectInfo.json();
  const projectList = infoJson.projects;
  const projects = projectList
    .map((project) => createProjectCard(project))
    .join('');

  const projectUl = document.querySelector('.projects-container');
  projectUl.innerHTML = projects;
};
getProjectInfo();

const createProjectCard = (project) =>
  `<li class="project">
  <figure><img src="${project.thumbnail}" alt="${project.alt}" /></figure>
  <h3 class="project-name">${project.name}</h3>
  <p class="description">${project.description}</p>
  <hr>
  <ul class="stack-list">
  ${project.stacks.map((stack) => `<li class="stack">${stack}</li>`).join('')}
  </ul>
  <a target="_blank" class="repository" href="${
    project.repository
  }">Source code</a>
</li>`;
