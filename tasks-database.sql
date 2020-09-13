CREATE TABLE "tasks" (
"id" SERIAL PRIMARY KEY, 
"task_name" VARCHAR(256) NOT NULL,
"task_desc" VARCHAR(256),
"task_time" VARCHAR(10),
"task_complete" BOOLEAN DEFAULT false);

INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('wash car', 'wash the car and scrub the rims', '45min');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('dust the bookshelves', 'dust the bookshelves from top to bottom. use a swiffer pad', '15min');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('mow lawn', 'rake for big sticks. do not bag clippings', '2.5hr');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('repair leaky faucet', 'check for bad valve first', '3hr');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('flip compost pile', 'mix-in one pile of dead leaves', '45min');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('vacuum stairs', 'spot clean cat vomit', '30min');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('fluff pillows', 'do outside', '15min');
INSERT INTO "tasks" ("task_name", "task_desc", "task_time")
VALUES ('breakdown costco boxes', 'stack cardboard behind bikes', '45min');
