import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const transitionPath = "src/components/motion/career-chapter-title.tsx";
const transitionStylesPath = "src/styles/career-chapter-transitions.css";
const performancePath = "scripts/measure-motion-performance.mjs";

test("career chapter identity uses a server-rendered React view transition", async () => {
  const transition = await readFile(transitionPath, "utf8");

  assert.match(transition, /import \{ ViewTransition, type ReactNode \} from "react"/);
  assert.match(transition, /name=\{`career-chapter-\$\{projectId\}`\}/);
  assert.match(transition, /share="career-chapter"/);
  assert.match(transition, /default="none"/);
  assert.doesNotMatch(transition, /"use client"|useEffect|useState|setTimeout/);
});

test("homepage and detail titles provide matching transition participants", async () => {
  const [careerThread, caseFrame, earthcam] = await Promise.all([
    readFile("src/components/home/career-thread.tsx", "utf8"),
    readFile("src/components/case-study/case-study-frame.tsx", "utf8"),
    readFile("src/app/work/earthcam/page.tsx", "utf8"),
  ]);

  assert.equal((careerThread.match(/<CareerChapterTitle projectId=/g) ?? []).length, 3);
  assert.match(caseFrame, /<CareerChapterTitle projectId=\{project\.id\}>/);
  assert.match(earthcam, /<CareerChapterTitle projectId=\{project\.id\}>/);
  assert.equal((careerThread.match(/transitionTypes=\{\["career-detail"\]\}/g) ?? []).length, 3);
});

test("project-aware return links target stable journey anchors", async () => {
  const [careerThread, backLink, caseFrame, earthcam, caseNavigation] = await Promise.all([
    readFile("src/components/home/career-thread.tsx", "utf8"),
    readFile("src/components/layout/back-to-journey.tsx", "utf8"),
    readFile("src/components/case-study/case-study-frame.tsx", "utf8"),
    readFile("src/app/work/earthcam/page.tsx", "utf8"),
    readFile("src/components/case-study/case-study-navigation.tsx", "utf8"),
  ]);

  assert.match(careerThread, /id=\{`experience-\$\{company\.projectId\}`\}/);
  assert.match(careerThread, /id=\{`experience-\$\{entry\.projectId\}`\}/);
  assert.match(careerThread, /id=\{`experience-\$\{iffers\.id\}`\}/);
  assert.match(backLink, /`\/#experience-\$\{projectId\}`/);
  assert.match(backLink, /transitionTypes=\{projectId \? \["career-return"\] : undefined\}/);
  assert.match(caseFrame, /<BackToJourney projectId=\{project\.id\} \/>/);
  assert.equal((earthcam.match(/<BackToJourney projectId=\{project\.id\}/g) ?? []).length, 2);
  assert.match(caseNavigation, /href=\{`\/#experience-\$\{currentProject\.id\}`\}/);
});

test("career transition CSS is brief, non-blocking, and reduced-motion safe", async () => {
  const [layout, styles] = await Promise.all([
    readFile("src/app/layout.tsx", "utf8"),
    readFile(transitionStylesPath, "utf8"),
  ]);

  assert.match(layout, /career-chapter-transitions\.css/);
  assert.match(styles, /::view-transition \{\s*pointer-events: none/);
  assert.match(styles, /::view-transition-group\(\.career-chapter\)/);
  assert.match(styles, /animation-duration: 320ms/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /animation-duration: 0s !important/);
  assert.match(styles, /animation-delay: 0s !important/);
  assert.doesNotMatch(styles, /translate|scale|top:|left:|width:|height:/);
});

test("the production probe validates career chapter navigation", async () => {
  const performanceProbe = await readFile(performancePath, "utf8");

  assert.match(performanceProbe, /"career-navigation"/);
  assert.match(performanceProbe, /measureCareerNavigation/);
  assert.match(performanceProbe, /a\[href="\/work\/earthcam"\]/);
  assert.match(performanceProbe, /routeState\.pathname !== "\/work\/earthcam"/);
  assert.match(performanceProbe, /returnHref !== "\/#experience-earthcam"/);
});
