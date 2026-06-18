CREATE TABLE `formSubmissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`studentName` varchar(255) NOT NULL,
	`institution` varchar(255) NOT NULL,
	`currentLevel` varchar(50) NOT NULL,
	`subject` varchar(100) NOT NULL,
	`challenges` text NOT NULL,
	`preferredStart` varchar(100) NOT NULL,
	`budgetRange` varchar(100) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`preferredContact` varchar(50) NOT NULL,
	`status` enum('pending','contacted','converted','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `formSubmissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletterSubscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`subscribedAt` timestamp NOT NULL DEFAULT (now()),
	`unsubscribedAt` timestamp,
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	CONSTRAINT `newsletterSubscriptions_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletterSubscriptions_email_unique` UNIQUE(`email`)
);
