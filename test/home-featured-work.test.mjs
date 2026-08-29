import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const careerPath = "src/components/home/career-thread.tsx";
const experiencePath = "src/content/experience.ts";

test("EarthCam and MEMX remain separate chronological company chapters", async () => {
  const experienceModule = await import("../src/content/experience.ts");

  assert.deepEqual(
    experienceModule.employmentHistory.map(({ projectId }) => projectId),
    ["earthcam", "memx"],
  );
  assert.equal(experienceModule.employmentHistory[0].roles.at(-1).end.dateTime, "2019-12");
  assert.equal(experienceModule.employmentHistory[1].roles[0].start.dateTime, "2019-12");
});

test("each company contains visible, non-interactive role chapters", async () => {
  const [career, experience] = await Promise.all([
    readFile(careerPath, "utf8"),
    readFile(experiencePath, "utf8"),
  ]);

  assert.match(career, /<ol className=\{styles\.roleList\}/);
  assert.match(career, /company\.roles\.map/);
  assert.match(career, /<h4/);
  assert.match(career, /<Period start=\{role\.start\} end=\{role\.end\}/);
  [
    "Junior Front-End Developer",
    "Lead Front-End Developer",
    "Front-End Engineer",
    "Senior Full Stack Engineer",
  ].forEach((role) => assert.match(experience, new RegExp(role)));
});

test("company chapters use real registry-backed detail routes", async () => {
  const career = await readFile(careerPath, "utf8");

  assert.match(career, /getProject\("earthcam"\)/);
  assert.match(career, /getProject\("memx"\)/);
  assert.match(career, /href=\{project\.href\}/);
  assert.match(career, /aria-label=\{`Read more about \$\{project\.name\}`\}/);
  assert.match(career, /min-h-11/);
});
