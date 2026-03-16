CREATE TABLE `birth_charts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`birthDate` varchar(20) NOT NULL,
	`birthTime` varchar(10),
	`birthLocation` text NOT NULL,
	`latitude` varchar(32),
	`longitude` varchar(32),
	`sunSign` varchar(32),
	`moonSign` varchar(32),
	`risingSign` varchar(32),
	`aiInterpretation` text,
	`planetaryPositions` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `birth_charts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`category` varchar(64),
	`targetDate` varchar(20),
	`status` enum('active','completed','paused') NOT NULL DEFAULT 'active',
	`aiGuidance` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `goals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`quizType` varchar(64) NOT NULL,
	`answers` json NOT NULL,
	`aiAnalysis` text,
	`personalityType` varchar(128),
	`strengths` json,
	`growthAreas` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_results_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_affirmations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`text` text NOT NULL,
	`category` varchar(64),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_affirmations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `birthDate` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `birthTime` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD `birthLocation` text;--> statement-breakpoint
ALTER TABLE `users` ADD `sunSign` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `moonSign` varchar(32);--> statement-breakpoint
ALTER TABLE `users` ADD `risingSign` varchar(32);