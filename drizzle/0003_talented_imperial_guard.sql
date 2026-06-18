ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','student','teacher','parent') NOT NULL DEFAULT 'student';--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` text;