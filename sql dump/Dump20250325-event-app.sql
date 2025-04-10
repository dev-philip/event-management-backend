-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: cis-4004.ctjcr9a8iebf.us-east-1.rds.amazonaws.com    Database: eventapp
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (20,'Social','2024-03-17 20:44:34','2024-03-17 20:44:34'),(21,'Fundraisingeee','2024-03-17 20:44:34','2024-03-17 20:44:34'),(22,'Tech Talks','2024-03-17 20:44:34','2024-03-17 20:44:34'),(23,'Academic','2024-03-17 20:44:34','2024-03-17 20:44:34'),(24,'Arts Exhibit','2024-03-17 20:44:34','2024-03-17 20:44:34'),(25,'Career/Jobs','2024-03-17 20:44:34','2024-03-17 20:44:34'),(26,'Concert/Performance','2024-03-17 20:44:34','2024-03-17 20:44:34'),(27,'Entertainment','2024-03-17 20:44:34','2024-03-17 20:44:34'),(28,'Health','2024-03-17 20:44:34','2024-03-17 20:44:34'),(29,'Holiday','2024-03-17 20:44:34','2024-03-17 20:44:34'),(30,'Meeting','2024-03-17 20:44:34','2024-03-17 20:44:34'),(31,'Open Forum','2024-03-17 20:44:34','2024-03-17 20:44:34'),(32,'Recreation & Exercise','2024-03-17 20:44:34','2024-03-17 20:44:34'),(33,'Service/Volunteer','2024-03-17 20:44:34','2024-03-17 20:44:34'),(34,'Speaker/Lecture/Seminar','2024-03-17 20:44:34','2024-03-17 20:44:34'),(35,'Sports','2024-03-17 20:44:34','2024-03-17 20:44:34'),(36,'Tour/Open House/Information Session','2024-03-17 20:44:34','2024-03-17 20:44:34'),(37,'Uncategorized/Other','2024-03-17 20:44:34','2024-03-17 20:44:34'),(38,'Workshop/Conference','2024-03-17 20:44:34','2024-03-17 20:44:34');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `comment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `event_id` int unsigned DEFAULT NULL,
  `comment_text` text,
  `rating` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `comment_user_id_foreign` (`user_id`),
  CONSTRAINT `comment_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES (11,13,7,'The event was a blast! Can\'t wait for the next one.',3,'2024-04-14 21:34:58','2024-04-14 21:34:58'),(12,13,6,'I\'m impressed by the quality of the product. It exceeded my expectations.',5,'2024-04-14 21:36:47','2024-04-14 21:36:47'),(13,13,8,'Thank you for sharing your insights. It\'s always inspiring to hear different viewpoints',4,'2024-04-14 21:43:15','2024-04-14 21:43:15'),(14,13,16,'Bless God! I enjoyed the event',5,'2024-04-14 21:43:54','2024-04-14 21:43:54'),(15,14,6,'Thank you for your hard work and dedication. It truly makes a difference.',4,'2024-04-14 21:45:41','2024-04-14 21:45:41'),(16,14,7,'This design is sleek and modern. You have a great eye for aesthetics',5,'2024-04-14 21:46:03','2024-04-14 21:46:03'),(17,14,14,'I\'m inspired by your resilience and determination. Keep up the amazing work!',4,'2024-04-14 21:46:22','2024-04-14 21:46:22'),(18,15,6,'The service was prompt and efficient. I couldn\'t have asked for better. Edited this',5,'2024-04-14 21:47:05','2024-04-14 21:47:05'),(19,15,14,'I\'m impressed by how well you handled the situation. Your professionalism shines through.',5,'2024-04-14 21:47:29','2024-04-14 21:47:29'),(21,15,17,'The Best event of my life',5,'2024-04-15 00:53:05','2024-04-15 00:53:05'),(22,23,17,'i like this event',5,'2024-05-22 20:23:06','2024-05-22 20:23:06');
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event`
--

DROP TABLE IF EXISTS `Event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event` (
  `event_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `about` text,
  `description` text,
  `event_date` date DEFAULT NULL,
  `start_time` varchar(50) DEFAULT NULL,
  `category_id` int unsigned DEFAULT NULL,
  `comment_id` int unsigned DEFAULT NULL,
  `contact_name` varchar(20) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `location_name` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `admin_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` varchar(50) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(100) DEFAULT NULL,
  `location_geocoding` json DEFAULT NULL,
  `additional_info` varchar(100) DEFAULT NULL,
  `visibility_id` int unsigned DEFAULT NULL,
  `rso_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `unique_event_name` (`name`),
  KEY `event_admin_id_foreign` (`admin_id`),
  KEY `event_category_id_foreign` (`category_id`),
  KEY `event_comment_id_foreign` (`comment_id`),
  KEY `fk_visibility_id` (`visibility_id`),
  KEY `fk_rso_id` (`rso_id`),
  CONSTRAINT `event_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `event_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `Category` (`category_id`),
  CONSTRAINT `event_comment_id_foreign` FOREIGN KEY (`comment_id`) REFERENCES `Comment` (`comment_id`),
  CONSTRAINT `fk_rso_id` FOREIGN KEY (`rso_id`) REFERENCES `RSO` (`rso_id`),
  CONSTRAINT `fk_visibility_id` FOREIGN KEY (`visibility_id`) REFERENCES `Visibility` (`visibility_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event`
--

LOCK TABLES `Event` WRITE;
/*!40000 ALTER TABLE `Event` DISABLE KEYS */;
INSERT INTO `Event` VALUES (6,'Open Water Scuba Certification','Outdoor Adventure is proud to partner with Ranger Rick\'s SCUBA Adventure, one of the most experienced scuba dive outfitters, for our entry-level NAUI SCUBA certification course. This course is available for students who are currently enrolled and taking classes at UCF.','Outdoor Adventure is proud to partner with Ranger Rick\'s SCUBA Adventure, one of the most experienced scuba dive outfitters, for our entry-level NAUI SCUBA certification course. This course is available for students who are currently enrolled and taking classes at UCF.\n\nUpon successful completion of this course and check-out dives, graduates are considered competent to engage in open water diving activities without supervision, provided the diving activities and the areas dived approximate those of training. No previous SCUBA experience is required; however, basic swimming skills are necessary to complete the course.\n\nCost\nThe total cost of the certification is $320 with $40 due at the time of registration. The rest of the price is due the first weekend of the certification paid to Ranger Rick SCUBA Adventures.\n\nSchedule\n\nIn order for the participant to receive the SCUBA certification, they must complete two consecutive weekends of training. The first weekend encompasses classroom work and practice dives in the pool. The first weekend includes Friday night, all day Saturday, and all day Sunday. For the second weekend, Ranger Rick will pick either Saturday or Sunday to complete the Open Water Dives. There  will be some adjustments to this schedule in Summer 2023, as you can see below. ','2024-04-17','2:00AM',23,NULL,'Outdoor Adventure De','4356785456','jamesbrown@gmail.com','Recreation and Wellness Center',28.50804160,-81.37519610,12,'2024-04-14 09:44:47','2024-04-14 09:44:47','3:00AM','3219 S Orange Ave','Orlando','Florida','32806',NULL,NULL,1,NULL),(7,'Standup Paddleboard Day Trip','Register for this trip in the UCF RWC app or through the UCF RWC Membership Portal website. All trips are now first-come, first-served. All trips will open two weeks before the first day of the trip. If the trip is full, you can register for the waitlist using the link above. ','Register for this trip in the UCF RWC app or through the UCF RWC Membership Portal website. All trips are now first-come, first-served. All trips will open two weeks before the first day of the trip. If the trip is full, you can register for the waitlist using the link above. \n\nPre-Trip Date and Time: April 8 - 7 p.m.\n\nTrip Description: Join Outdoor Adventure as we paddle through Florida’s pristine waters on stand up paddleboards! The scenic will offer us the chance to see wildlife and spend a day in the beautiful Florida sun.\n\nWhat’s Included: All of our adventures include all necessary gear for the activity (including mountain bikes and helmets), transportation to/from the activity and professional guidance by OA trip leaders. All staff are certified in First Aid/CPR/AED, and most are certified Wilderness First Responders. \n\nWhat’s Not Included: Participants should wear athletic clothing, appropriate footwear, and bring personal water/snacks. Meals are not provided. A full packing list will be provided at the Pre-Trip Meeting.\n\nTrip Leaders: Galya, Jack, Raven','2024-04-18','2:30PM',27,NULL,'Outdoor Adventure','2134535466','outdoor@gmail.com','Santos Trailhead',28.37065250,-81.36067280,12,'2024-04-14 18:56:36','2024-04-14 18:56:36','3:30PM','654 Oregon Woods Ct','Orlando','Florida','32824',NULL,'',1,NULL),(8,'Come Out and Climb','Come Out and Climb is a free monthly event at the UCF Climbing Tower intended to build an intentional and supportive community for LGBTQ+ climbers. All necessary climbing gear will be provided and all skill levels are encouraged to attend! Open to all abilities and genders, allies welcome.','Come Out and Climb is a free monthly event at the UCF Climbing Tower intended to build an intentional and supportive community for LGBTQ+ climbers. All necessary climbing gear will be provided and all skill levels are encouraged to attend! Open to all abilities and genders, allies welcome.\n\nWhat happens at Come Out and Climb?\n\nMostly we just hang out and climb, but we will occasionally do some icebreakers/name games or friendly competitions to get people talking. If it is your first time at the Climbing Tower, we\'ll review our Tower Orientation and talk you through our gear and procedures. After that, it is open climbing time! We encourage everyone to meet someone new and offer support to each other. This means cheering each other on, asking if and how people would like to be coached before offering advice, and upholding our community policies. We also encourage UCF community groups (like RSOs) to sign up to table at our events, which is a great way to expand your group\'s network and share resources with our community!\n\nI am an ally and my friend or family member identifies as LGBTQ+. Can I tag along? Am I allowed to climb with the group?\n\nYes! Allies are welcome. We expect you to commit to positive and active allyship. We welcome your participation and appreciate that you are committed to helping us maintain a safe and welcoming space for people in the LGBTQ+ community.','2024-04-19','7:30AM',27,NULL,'Grace Fisher','5675435465','graceapeti@gmail.com','Climbing Tower ',28.48376370,-81.30942490,14,'2024-04-14 19:01:46','2024-04-14 19:01:46','8:00AM','5425 S Semoran Blvd','Orlando','Florida','32822',NULL,'',1,NULL),(9,'Faculty Recital: Benjamin Vasko and Thomas Weaver','A recital presented by Dr. Benjamin Vasko (tuba) and Thomas Weaver (piano). Thomas Weaver is an American pianist and composer currently on the Musical Studies faculty at the Curtis Institute of Music in Philadelphia and on faculty at the Boston University Tanglewood Institute. He began his piano studies at the age of eight, giving his first public performance and starting to compose at the age of nine.\n','Thomas Weaver is an American pianist and composer currently on the Musical Studies faculty at the Curtis Institute of Music in Philadelphia and on faculty at the Boston University Tanglewood Institute. He began his piano studies at the age of eight, giving his first public performance and starting to compose at the age of nine.\n\nThomas Weaver maintains an active solo and chamber career that has included performances in the United States, Europe and Asia. His playing has been hailed as displaying both “sensitivity” and “incredible dexterity.” Weaver has appeared in many concert halls, including those in New York (Carnegie Hall, Greene Space, Lincoln Center, Merkin Hall), Philadelphia, Washington D.C. (Phillips Collection), Boston (Jordan Hall), Chicago, Nashville, Dallas, Berlin (Germany), Itami (Japan), the Tanglewood Music Festival, Red Rocks Music Festival, New York Chamber Music Festival and others. Weaver has performed with a number of eminent musicians including Elmira Darvarova, Jess Gillam, Kenneth Radnofsky, Jennifer Frautschi, Gene Pokorny, and members of the Metropolitan Opera Orchestra, New York Philharmonic, Philadelphia Orchestra, Boston Symphony Orchestra and others. Weaver is a currently a member of the Amram Ensemble, Trio Ardente and New England Chamber Players, in addition to serving as the music director of the Marian Anderson Historical Society.\n\nA champion of new music, Weaver has premiered many pieces, including works by David Amram, David Loeb, Anthony Plog, John Wallace, and Christopher LaRosa. In 2018, Weaver was featured performing Leonard Bernstein’s Symphony No. 2 Age of Anxiety with the Boston University Tanglewood Institute Orchestra as part of Leonard Bernstein’s centennial celebration. His playing can be heard on the CDs, David Amram: “So In America” and Astor Piazzolla: Genius of Tango, released by Affetto Records, both of which include world premiere recordings and arrangements.\n\nAn award-winning composer, Thomas Weaver’s music has been performed throughout the United States, Germany, Austria and Japan. His works have been commissioned by number of organizations and musicians including the New York Chamber Music Festival, Elmira Darvarova, Dr. Brittany Lasch, Pharos Quartet, Kenneth Radnofsky, Dr. Joshua Blumenthal, Thomas Weston and the Daraja Ensemble. Weaver’s works have also been performed by large ensembles such as the Boston University Symphony Orchestra, Alea III and Mannes American Composers Orchestra. His works have been conducted by various conductors including Theodore Antoniou, Alan Pierson and Konstantin Dobroykov. Weaver’s compositions have won numerous awards and competitions, including the Bohuslav Martinu Award and Boston University Composition Competition. His extensive collection of horn works has been analyzed in Dr. Joshua Blumenthal’s dissertation, A Performer’s Approach to the Horn Solo and Chamber Music of Thomas E. Weaver.\n\nWeaver is on faculty at the Curtis Institute of Music, where he teaches Core Studies (harmony, counterpoint and analysis), Advanced Counterpoint, Score Reading, Keyboard Studies, and Supplementary Piano. At the Boston University Tanglewood Institute he serves as theory instructor and instrumental coach. He holds a master of music degree in both piano performance and composition from Mannes College, and a bachelor of music degree, summa cum laude, from Boston University. His primary piano teachers include Anthony di Bonaventura, Victor Rosenbaum and Pavel Nersessian. His primary composition instructors include David Loeb, Dr. John Wallace, Dr. Martin Amlin and Jonathan Coopersmith.','2024-04-20','7:00PM',26,NULL,'Benjamin Vasko','4532167543','benjamin.vasko@gmail.com','Rehersal Hall',28.28100530,-81.35119940,14,'2024-04-14 19:04:44','2024-04-14 19:04:44','8:00PM','2214 Villa Verano Way','Kissimmee','Florida','34744',NULL,'',1,NULL),(10,'Theatre UCF presents \"Sweeney Todd: The Demon Barber of Fleet Street\"','A thrilling story set to music by the legendary Stephen Sondheim, Sweeney Todd captivates the audience by the emotionally stirring tale of Benjamin Barker, an exiled barber, who returns to 19th century London to settle a score with his nemesis and find his family.','Music and Lyrics by Stephen Sondheim, Book by Hugh Wheeler, Directed by Michael Wainstein\n\nA thrilling story set to music by the legendary Stephen Sondheim, Sweeney Todd captivates the audience by the emotionally stirring tale of Benjamin Barker, an exiled barber, who returns to 19th century London to settle a score with his nemesis and find his family.\n\nWinner of the 1979 Tony Award for Best Musical and currently selling out in a smash Broadway revival, this soaring musical tells the story of Sweeney Todd and Mrs. Lovett, long in love with the anguished barber, who assists him in his search for his lost daughter and wife. A comic vein runs through the gothic, romantic and chilling account of Sweeney’s search for truth. A Victorian-era ambiance enhances Sondheim’s score, with stunning dissonance and dark beauty. Join us for an evening of fantasy, humor and thrills.','2024-04-21','12:00AM',24,NULL,'UCF Box Office','3214093485','boxoffice@ucf.edu','Dr. Phillips Center for the Performing Arts: Walt Disney Theater',28.59685740,-81.20326940,14,'2024-04-14 19:20:07','2024-04-14 19:20:07','1:00AM','4000 Central Florida Blvd','Orlando','Florida','32816',NULL,'',2,NULL),(11,'Powerlifting Competition','Students who are serious about powerlifting are encouraged to participate in the Recreation and Wellness Center (RWC)’s 10th annual powerlifting competition.','Students who are serious about powerlifting are encouraged to participate in the Recreation and Wellness Center (RWC)’s 10th annual powerlifting competition. Each participant will be given three attempts on squat, bench press and deadlift to earn their highest total (the sum of the three lifts) and a chance to be the UCF RWC’s powerlifting champion! Lifters must weigh in at the RWC prior to the event. Registration opens March 29 and closes April 5. ','2024-04-22','4:00PM',35,NULL,'RWC Fitness','3214345656','fitness@ucf.edu','Main RWC ',28.46821790,-81.32889670,14,'2024-04-14 19:23:34','2024-04-14 19:23:34','6:00PM','6021 Conway Rd','Orlando','Florida','32812',NULL,'',2,NULL),(12,'M.S. Business Analytics Information Session','From the data enthusiast to data expert, the Master\'s in Business Analytics program is designed for you.\n\nTo learn more, join our admissions team and program director for this virtual information session.','From the data enthusiast to data expert, the Master\'s in Business Analytics program is designed for you.\n\nTo learn more, join our admissions team and program director for this virtual information session. This online admissions event will provide details about the master\'s in business analytics including curriculum, learning outcomes, business analytics software, schedule, cohort format, application process and admission process. After the presentation, stay online for a live Q&A with Graduate Admissions Coordinator Meredith Smart and Program Director Dr. Lealand Morin.','2024-04-21','8:00AM',34,NULL,'Meredith Smart','4324323454','meredith.smart@ucf.edu','The Additional Arena',28.47398420,-81.46537680,14,'2024-04-14 19:34:18','2024-04-14 19:34:18','10:00AM','6000 Universal Blvd','Orlando','Florida','32819',NULL,'',2,NULL),(13,'Alcoholics Anonymous','Alcoholics Anonymous (A.A.) is a fellowship of people who share their experience, strength, and hope with each other that they may solve their common problem and help others to recover from alcoholism. The only requirement for membership is a desire to stop drinking. ','Alcoholics Anonymous (A.A.) is a fellowship of people who share their experience, strength, and hope with each other that they may solve their common problem and help others to recover from alcoholism. The only requirement for membership is a desire to stop drinking. There are no dues or fees for A.A. membership. We are self-supporting through our own contributions. A.A. is not allied with any sect, denomination, politics, organization, or institution, does not wish to engage in any controversy, neither endorses nor opposes any causes. Our primary purpose is to stay sober and help other alcoholics to achieve sobriety.\n\nFor more information about this meeting, visit studenthealth.ucf.edu/recovery/ or call the AA 24-Hr Helpline at (407) 260-5408.','2024-04-25','6:00PM',30,NULL,'Collegiate Recovery','5473743748','crc@ucf.edu','Student Union 313: Admin: 313 ',28.47398420,-81.46537680,12,'2024-04-14 19:41:19','2024-04-14 19:41:19','7:30PM','6000 Universal Blvd','Orlando','Florida','32819',NULL,'',2,NULL),(14,'Technicolor: B.S. in Photography Exhibition','The 2024 Photography and Art class at UCF is pleased to announce its curation of photographic works by current undergraduate students in the UCF BS in Photography program. This year’s theme is a celebration of color entitled Technicolor!','The 2024 Photography and Art class at UCF is pleased to announce its curation of photographic works by current undergraduate students in the UCF BS in Photography program. This year’s theme is a celebration of color entitled Technicolor!\n\nThis exhibition will feature colorful, vibrant student work never before exhibited. This is a wonderful opportunity to see the work of these rising artists firsthand.','2024-04-27','8:00AM',24,NULL,'Laine Wyatt','6578675654','Laine.Wyatt@ucf.edu','Gallery 202: Photography Building, #530 ',28.47398420,-81.46537680,12,'2024-04-14 20:11:12','2024-04-14 20:11:12','8:30AM','6000 Universal Blvd','Orlando','Florida','32819',NULL,'',3,4),(15,'Coping Skills: Distress Tolerance','Learn ways of managing frustrations, stress and problems effectively. It’s about being active in solving problems and accepting when things are out of your control.','Learn ways of managing frustrations, stress and problems effectively. It’s about being active in solving problems and accepting when things are out of your control.\n\nThis workshop is part of the Counseling & Psychological Services (CAPS) Well-Being Online Workshop series! Learn about CAPS and other workshops.','2024-04-26','8:00AM',38,NULL,'Scoot Kern','4567893456','Scott.Kern@ucf.edu','The Additional Arena',28.47398420,-81.46537680,12,'2024-04-14 20:20:44','2024-04-14 20:20:44','9:00AM','6000 Universal Blvd','Orlando','Florida','32819',NULL,'',3,5),(16,'Tuesday Night Bible Study with Wesley at UF','Join us every Tuesday night in our space for a free dinner and discussion on the Christian scriptures. We will also be studying Martin Luther King\'s concept of The Beloved Community. ','Join us every Tuesday night in our space for a free dinner and discussion on the Christian scriptures. We will also be studying Martin Luther King\'s concept of The Beloved Community. Dinner starts at 6 p.m. and our study is from 7-8 p.m. You can also join us online on Zoom if you can\'t make it in person. This group is open to all college-age young adults, UCF staff and students in the Orlando area. Throughout January, we will be learning about the book of Timothy. We will then transition to offering a certificate from the MLK Center in Atlanta, Georgia, focusing on King’s concept of Nonviolence during March and April.','2024-04-24','5:30AM',34,NULL,'Erwin Lopez','4323234567','wesley.cfl@gmail.com','Trevor Aloma Hall',29.26979950,-82.18049750,13,'2024-04-14 20:32:12','2024-04-14 20:32:12','6:00AM','7857 NW Gainesville Rd','Ocala','Florida','34475',NULL,'',3,9),(17,'Type Out Loud','Broadside: A single sheet of paper printed on one side only. AKA: poster. Broadsides have been a popular ephemeral format for distributing news, announcements, advertisements, social commentary, and ballads for centuries.','Broadside: A single sheet of paper printed on one side only. AKA: poster. Broadsides have been a popular ephemeral format for distributing news, announcements, advertisements, social commentary, and ballads for centuries.\n\nThis exhibition highlights the social role broadsides play in communicating messages to public audiences. Designed to be plastered onto walls as a disposable form of street literature, broadsides in fact record our cultural histories. The posters in this show introduce the history of the broadside, showcase the design and print process, and survey how contemporary poster design informs our own visual culture. Typographic broadsides can be a powerful, artistic form of broadcasting social, political, and cultural messages. Type Out Loud shows how.','2024-05-01','2:00PM',24,NULL,'UCF Art Gallery','3736273625','gallery@ucf.edu','UCF Art Gallery ',28.47398420,-81.46537680,21,'2024-04-15 00:49:08','2024-04-15 00:49:08','3:00PM','6000 Universal Blvd','Orlando','Florida','32819',NULL,'',2,NULL),(18,'Adult First Aid/CPR/AED Class','The Recreation and Wellness Center (RWC) offers American Red Cross Adult CPR/AED, First Aid Blended Learning classes. The Blended Learning class includes an online portion (approximately two to three hours long) and an instructor-led class skills session (approximately two hours long).','The Recreation and Wellness Center (RWC) offers American Red Cross Adult CPR/AED, First Aid Blended Learning classes. The Blended Learning class includes an online portion (approximately two to three hours long) and an instructor-led class skills session (approximately two hours long). The online portion must be completed prior to attending the in-class skills session. To register for this class please call 407-823-2408, or walk in to the RWC administrative office between 8 a.m. and 5 p.m. Monday through Friday, and someone will assist you.','2024-05-02','7:00AM',28,NULL,'RWC Risk Management ','4637264627','RWCAthleticTraining@ucf.edu','RWC Wet Classroom ',28.28882980,-81.36111920,12,'2024-04-15 01:13:50','2024-04-15 01:13:50','8:30AM','362 Parkland Cir','Kissimmee','Florida','34744',NULL,'',3,6);
/*!40000 ALTER TABLE `Event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Event_Schedule`
--

DROP TABLE IF EXISTS `Event_Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_Schedule` (
  `schedule_id` int unsigned NOT NULL AUTO_INCREMENT,
  `event_time` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`schedule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_Schedule`
--

LOCK TABLES `Event_Schedule` WRITE;
/*!40000 ALTER TABLE `Event_Schedule` DISABLE KEYS */;
INSERT INTO `Event_Schedule` VALUES (1,'12:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(2,'12:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(3,'1:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(4,'1:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(5,'2:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(6,'2:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(7,'3:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(8,'3:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(9,'4:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(10,'4:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(11,'5:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(12,'5:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(13,'6:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(14,'6:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(15,'7:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(16,'7:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(17,'8:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(18,'8:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(19,'9:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(20,'9:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(21,'10:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(22,'10:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(23,'11:00AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(24,'11:30AM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(25,'12:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(26,'12:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(27,'1:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(28,'1:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(29,'2:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(30,'2:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(31,'3:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(32,'3:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(33,'4:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(34,'4:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(35,'5:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(36,'5:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(37,'6:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(38,'6:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(39,'7:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(40,'7:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(41,'8:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(42,'8:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(43,'9:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(44,'9:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(45,'10:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(46,'10:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(47,'11:00PM','2024-03-31 21:06:56','2024-03-31 21:06:56'),(48,'11:30PM','2024-03-31 21:06:56','2024-03-31 21:06:56');
/*!40000 ALTER TABLE `Event_Schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RSO`
--

DROP TABLE IF EXISTS `RSO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RSO` (
  `rso_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `admin_id` int unsigned DEFAULT NULL,
  `university_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `about` varchar(255) DEFAULT NULL,
  `contactEmail` varchar(255) DEFAULT NULL,
  `contactPhone` varchar(20) DEFAULT NULL,
  `photopath` varchar(255) DEFAULT NULL,
  `coverphotopath` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rso_id`),
  UNIQUE KEY `unique_RSO_name` (`name`),
  KEY `rso_admin_id_foreign` (`admin_id`),
  KEY `rso_university_id_foreign` (`university_id`),
  CONSTRAINT `rso_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `rso_university_id_foreign` FOREIGN KEY (`university_id`) REFERENCES `University` (`uni_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RSO`
--

LOCK TABLES `RSO` WRITE;
/*!40000 ALTER TABLE `RSO` DISABLE KEYS */;
INSERT INTO `RSO` VALUES (4,'Alpha Omega Fellowship',11,10,'2024-04-14 08:22:00','2024-04-14 08:22:00','We are a community of students passionate about environmental sustainability and conservation efforts','omega@gmail.com','3214567897','uploads/rso/1713082921260-5.jpg','uploads/rso/1713082921260-1.jpg'),(5,'Crimson Knights Society',12,10,'2024-04-14 08:32:26','2024-04-14 08:32:26','We strive to make a positive impact on our local community through volunteering and outreach programs','crimson@gmail.com','3984372374','uploads/rso/1713083546416-6.jpg','uploads/rso/1713083546417-4.jpg'),(6,'Phoenix Rising Club',12,10,'2024-04-14 08:35:24','2024-04-14 08:35:24','Our organization is dedicated to supporting mental health awareness and providing resources for students','phoenix@gmail.com','3213434532','uploads/rso/1713083724794-touch.jpg','uploads/rso/1713083724794-cartoon.jpg'),(7,'Infinity Alliance',14,10,'2024-04-14 08:38:48','2024-04-14 08:38:48','Our mission is to advocate for social justice issues and create a more inclusive campus environment.','infinity@gmail.com','3214545342','uploads/rso/1713083928951-sunny.jpg','uploads/rso/1713083928951-gre.png'),(8,'Pinnacle Pursuit Society',14,10,'2024-04-14 08:40:48','2024-04-14 08:40:48','We are a group of sports enthusiasts who love staying active and competing in friendly competitions.','pinnacle@gmail.com','3214453246','uploads/rso/1713084049423-MyOld image.jpg','uploads/rso/1713084049451-rererer.jpg'),(9,'Unity United Club',13,11,'2024-04-14 20:29:47','2024-04-14 20:29:47','Join our RSO, Unity United Club, where we celebrate diversity and promote unity among students from all backgrounds. Through various events, discussions, and community service initiatives, we aim to foster a sense of belonging and understanding among our ','unityave@gmail.com','3214567896','uploads/rso/1713126588072-backfirey3.jpg','uploads/rso/1713126588072-like.png'),(10,'Emerald Enigma Association',21,10,'2024-04-15 00:43:40','2024-04-15 00:43:40','Our group aims to promote cultural diversity and understanding through various events and activities.','emerald@gmail.com','3214526372','uploads/rso/1713141821450-greg.jpg','uploads/rso/1713141821450-ggrea.png'),(11,'TEst Rso',33,14,'2024-07-26 15:19:21','2024-07-26 15:19:21','test about','fe@gmail.com','3214932323','uploads/rso/1722007161214-4.jpg','uploads/rso/1722007161215-1.jpg'),(12,'RSO',37,10,'2024-07-26 16:41:14','2024-07-26 16:41:14','This is a Test RSO','lcaraszi@gmail.com','3863163435','uploads/rso/1722012074565-paris.webp','uploads/rso/1722012074573-ball.jpg');
/*!40000 ALTER TABLE `RSO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `Roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Roles` (
  `role_id` int unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL,
  `permission` json DEFAULT NULL,
  `visibility` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `unique_role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Roles`
--

LOCK TABLES `Roles` WRITE;
/*!40000 ALTER TABLE `Roles` DISABLE KEYS */;
INSERT INTO `Roles` VALUES (1,'super admin',NULL,NULL,'2024-03-21 04:00:38','2024-03-21 04:00:38'),(2,'admin',NULL,NULL,'2024-03-21 04:00:38','2024-03-21 04:00:38'),(3,'student',NULL,NULL,'2024-03-21 04:00:38','2024-03-21 04:00:38');
/*!40000 ALTER TABLE `Roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rsomembers`
--

DROP TABLE IF EXISTS `Rsomembers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rsomembers` (
  `rsomember_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `uni_id` int unsigned DEFAULT NULL,
  `rso_id` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rsomember_id`),
  UNIQUE KEY `rsomember_id` (`rsomember_id`),
  KEY `user_id` (`user_id`),
  KEY `uni_id` (`uni_id`),
  KEY `rso_id` (`rso_id`),
  CONSTRAINT `Rsomembers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  CONSTRAINT `Rsomembers_ibfk_2` FOREIGN KEY (`uni_id`) REFERENCES `University` (`uni_id`),
  CONSTRAINT `Rsomembers_ibfk_3` FOREIGN KEY (`rso_id`) REFERENCES `RSO` (`rso_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rsomembers`
--

LOCK TABLES `Rsomembers` WRITE;
/*!40000 ALTER TABLE `Rsomembers` DISABLE KEYS */;
INSERT INTO `Rsomembers` VALUES (14,11,10,4,'2024-04-14 08:22:00','2024-04-14 08:22:00'),(15,12,10,4,'2024-04-14 08:22:01','2024-04-14 08:22:01'),(16,14,10,4,'2024-04-14 08:22:01','2024-04-14 08:22:01'),(17,15,10,4,'2024-04-14 08:22:01','2024-04-14 08:22:01'),(18,17,10,4,'2024-04-14 08:22:01','2024-04-14 08:22:01'),(19,12,10,5,'2024-04-14 08:32:26','2024-04-14 08:32:26'),(20,11,10,5,'2024-04-14 08:32:26','2024-04-14 08:32:26'),(21,17,10,5,'2024-04-14 08:32:26','2024-04-14 08:32:26'),(22,14,10,5,'2024-04-14 08:32:26','2024-04-14 08:32:26'),(23,16,10,5,'2024-04-14 08:32:26','2024-04-14 08:32:26'),(24,12,10,6,'2024-04-14 08:35:24','2024-04-14 08:35:24'),(25,11,10,6,'2024-04-14 08:35:24','2024-04-14 08:35:24'),(27,17,10,6,'2024-04-14 08:35:24','2024-04-14 08:35:24'),(28,16,10,6,'2024-04-14 08:35:24','2024-04-14 08:35:24'),(29,14,10,7,'2024-04-14 08:38:48','2024-04-14 08:38:48'),(30,11,10,7,'2024-04-14 08:38:48','2024-04-14 08:38:48'),(31,15,10,7,'2024-04-14 08:38:48','2024-04-14 08:38:48'),(33,17,10,7,'2024-04-14 08:38:48','2024-04-14 08:38:48'),(34,14,10,8,'2024-04-14 08:40:49','2024-04-14 08:40:49'),(35,11,10,8,'2024-04-14 08:40:49','2024-04-14 08:40:49'),(36,12,10,8,'2024-04-14 08:40:49','2024-04-14 08:40:49'),(37,17,10,8,'2024-04-14 08:40:49','2024-04-14 08:40:49'),(38,15,10,8,'2024-04-14 08:40:49','2024-04-14 08:40:49'),(41,16,10,7,'2024-04-14 09:10:19','2024-04-14 09:10:19'),(42,13,11,9,'2024-04-14 20:29:47','2024-04-14 20:29:47'),(43,10,11,9,'2024-04-14 20:29:48','2024-04-14 20:29:48'),(44,18,11,9,'2024-04-14 20:29:48','2024-04-14 20:29:48'),(45,19,11,9,'2024-04-14 20:29:48','2024-04-14 20:29:48'),(46,20,11,9,'2024-04-14 20:29:48','2024-04-14 20:29:48'),(47,21,10,10,'2024-04-15 00:43:41','2024-04-15 00:43:41'),(48,11,10,10,'2024-04-15 00:43:41','2024-04-15 00:43:41'),(49,12,10,10,'2024-04-15 00:43:41','2024-04-15 00:43:41'),(50,14,10,10,'2024-04-15 00:43:41','2024-04-15 00:43:41'),(51,17,10,10,'2024-04-15 00:43:41','2024-04-15 00:43:41'),(52,21,10,8,'2024-04-15 00:44:11','2024-04-15 00:44:11'),(55,21,10,4,'2024-04-15 00:44:30','2024-04-15 00:44:30'),(56,15,10,6,'2024-04-15 01:14:55','2024-04-15 01:14:55'),(57,23,10,10,'2024-05-22 20:23:46','2024-05-22 20:23:46'),(63,28,10,7,'2024-07-15 20:14:12','2024-07-15 20:14:12'),(66,28,10,6,'2024-07-15 20:14:15','2024-07-15 20:14:15'),(67,28,10,5,'2024-07-15 20:14:16','2024-07-15 20:14:16'),(68,28,10,4,'2024-07-15 20:14:18','2024-07-15 20:14:18'),(72,33,14,11,'2024-07-26 15:19:21','2024-07-26 15:19:21'),(73,32,14,11,'2024-07-26 15:19:21','2024-07-26 15:19:21'),(74,31,14,11,'2024-07-26 15:19:21','2024-07-26 15:19:21'),(75,34,14,11,'2024-07-26 15:19:21','2024-07-26 15:19:21'),(76,35,14,11,'2024-07-26 15:19:21','2024-07-26 15:19:21'),(78,36,14,11,'2024-07-26 15:20:22','2024-07-26 15:20:22'),(83,11,10,12,'2024-07-26 16:41:14','2024-07-26 16:41:14'),(84,12,10,12,'2024-07-26 16:41:14','2024-07-26 16:41:14'),(85,14,10,12,'2024-07-26 16:41:14','2024-07-26 16:41:14'),(86,15,10,12,'2024-07-26 16:41:14','2024-07-26 16:41:14');
/*!40000 ALTER TABLE `Rsomembers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `University`
--

DROP TABLE IF EXISTS `University`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `University` (
  `uni_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) DEFAULT NULL,
  `about` text,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zipCode` varchar(10) DEFAULT NULL,
  `additionalInfo` text,
  `lat` decimal(10,6) DEFAULT NULL,
  `lng` decimal(10,6) DEFAULT NULL,
  `geocode` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `cover_photo` varchar(255) DEFAULT NULL,
  `admin_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`uni_id`),
  UNIQUE KEY `unique_university_name` (`name`),
  UNIQUE KEY `unique_university_email` (`email`),
  KEY `fk_university_admin_id` (`admin_id`),
  CONSTRAINT `fk_university_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `Users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `University`
--

LOCK TABLES `University` WRITE;
/*!40000 ALTER TABLE `University` DISABLE KEYS */;
INSERT INTO `University` VALUES (10,'2024-04-14 07:53:24','2024-04-14 07:53:24','University of Central Florida','The University of Central Florida is a public research university with its main campus in unincorporated Orange County, Florida. It is part of the State University System of Florida','ucf@gmail.com','4078232000','4000 Central Florida Blvd','Orlando','Florida','32816','',28.596857,-81.203269,'ola','uploads/university/1713081205013-Photo-ucf logo.png','uploads/university/1713081205012-CoverPhoto-touch.jpg',11),(11,'2024-04-14 08:02:50','2024-04-14 08:02:50','University of Florida','The University of Florida is a public land-grant research university in Gainesville, Florida. It is a senior member and flagship of the State University System of Florida. The university traces its origins to 1853 and has operated continuously on its Gainesville campus since September 1906','uf@gmail.com','3214032303','925 NW 56th Terrace','Gainesville','Florida','32605','',29.661603,-82.402636,'ola','uploads/university/1713081770665-Photo-University-of-Florida-Logo.png','uploads/university/1713081770665-CoverPhoto-5.jpg',10),(12,'2024-04-15 01:09:00','2024-04-15 01:09:00','The University of Texas at Austin','The University of Texas at Austin is a public research university in Austin, Texas. It is the flagship institution of the University of Texas System. With 52,384 students as of Fall 2022, it is also the largest institution in the system. Founded in 1883, UT Austin is considered a Public Ivy','texasuniversity@gmail.com','2515263728','2515 Speedway','Austin','Texas','78712','',30.289062,-97.736493,'ola','uploads/university/1713143341185-Photo-ggrea.png','uploads/university/1713143341182-CoverPhoto-cover.jpg',22),(14,'2024-07-26 15:13:34','2024-07-26 15:13:34','Florida International University','A world-class institution of higher learning, FIU is Miami’s public research university. Since it opened its doors in 1972, FIU has graduated more than 275,000 alumni.','fiu@gmail.com','3214027328','11200 SW 8th St','Miami','Florida','33199','',25.759353,-80.371302,'ola','uploads/university/1722006814044-Photo-vcvc.jpg','uploads/university/1722006814043-CoverPhoto-backfirey3.jpg',31);
/*!40000 ALTER TABLE `University` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` int unsigned DEFAULT NULL,
  `uni_id` int unsigned DEFAULT NULL,
  `about` text,
  `profile_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_user_email` (`email`),
  KEY `fk_role_id` (`role_id`),
  KEY `users_uni_id_foreign` (`uni_id`),
  CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`role_id`),
  CONSTRAINT `users_uni_id_foreign` FOREIGN KEY (`uni_id`) REFERENCES `University` (`uni_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (10,'jane','smith','janesmith@gmail.com','$2b$10$8/zsv6BFi21.pOJ7RolvFOWyMFLNC9Hg/UuAmLHjBgdINSG91Hdcu','2024-04-14 02:07:43','2024-04-14 02:07:43',1,11,NULL,NULL),(11,'david','johnson','davidjohnson@gmail.com','$2b$10$MMrC3SaK.5sZ2fn4/PHLPOw2WQxrJAtoq9oy1kxrEDw2pX/MNjW1K','2024-04-14 02:08:37','2024-04-14 02:08:37',1,10,NULL,NULL),(12,'emily','brown','emilybrown@gmail.com','$2b$10$bMt.qYqMt1haM/I9Qi..FuFapfYpp4nVJcszjcrh7l1/y8d8ixwyO','2024-04-14 08:04:54','2024-04-14 08:04:54',2,10,'I am a cool person','uploads/profileimage/1713143147222-profilepicture-4.jpg'),(13,'micheal','davis','michealdavis@gmail.com','$2b$10$lEW/xLPoSx3.DU.AMHYLduDBssZD6NmD3DX4DJglCdcZW8liyBnC.','2024-04-14 08:06:25','2024-04-14 08:06:25',2,11,NULL,NULL),(14,'sarah','wilson','sarahwilson@gmail.com','$2b$10$Aw3wSlDEbFWd9Ty30KIShOQ32R/k3ZgaikQwiDFWE2mnvlNYhpoLa','2024-04-14 08:07:58','2024-04-14 08:07:58',2,10,NULL,NULL),(15,'james','taylor','jamestaylor@gmail.com','$2b$10$vBFqYDW2ztmLMr/5WHAxUeTbmatFVoRcVdt/eaiq7tGs.v15badjK','2024-04-14 08:09:55','2024-04-14 08:09:55',3,10,NULL,NULL),(16,'emma','martinez','emmamartinez@gmail.com','$2b$10$50zkgmpXXFZuSC4Ho9o/iOuSFhzaTwm0RoZt/5BOLpxMojCCDYAp2','2024-04-14 08:10:32','2024-04-14 08:10:32',3,10,NULL,NULL),(17,'william','anderson','williamanderson@gmail.com','$2b$10$sFaWbnGb.UnR3u4.OLMeWOz26Ifvu3J3vYq4ts7e2dmxfmvBmMhH.','2024-04-14 08:11:42','2024-04-14 08:11:42',3,10,NULL,NULL),(18,'olivia','thomas','oliviathomas@gmail.com','$2b$10$9klM9W4q4JzyEiWv9H60ZeZSWuZzEFJJOSrXlE2sYVJiCLbK943r.','2024-04-14 08:12:17','2024-04-14 08:12:17',3,11,NULL,NULL),(19,'lorry','waters','lorrywaters@gmail.com','$2b$10$weXqBr0a5sjsAlIz5J16se2cJlnhjk4MI/q2qsuVUES6D71rfSkm.','2024-04-14 08:12:57','2024-04-14 08:12:57',3,11,NULL,NULL),(20,'tunex','avelon','tunexavelon@gmail.com','$2b$10$GpYhvVoCJp08JhgWPeQBWu2KqDIGl92HK7BN.C.ShSF4rlLAUnNGC','2024-04-14 20:28:37','2024-04-14 20:28:37',3,11,NULL,NULL),(21,'peter','bond','peterbond@gmail.com','$2b$10$y58tg6JrGdKX/iN68u2G9OgDkJK9iyISAc0XK1ekgBuddo1CIK2QW','2024-04-15 00:39:22','2024-04-15 00:39:22',2,10,NULL,NULL),(22,'philip','big','philipbig@gmail.com','$2b$10$eCq0LTZKoaHXSAljAG4KrOY12HHK9SFrnOesLeeFm8K1dLzln.lBW','2024-04-15 01:07:18','2024-04-15 01:07:18',1,12,NULL,NULL),(23,'logan','boy','logan@gmail.com','$2b$10$DNa3GoQjwQ4cyMPs9E0PluaN4YfCw13x.dC8mQ8X4LZH2ZvR1jZ6W','2024-05-22 20:22:20','2024-05-22 20:22:20',3,10,NULL,NULL),(24,'alex','diaz','alex@ucf.com','$2b$10$wEq5fzm7WzGOZwzIPWytIOlnyOrjLlW1t1L/68TEwwopX718BLwOy','2024-06-02 03:57:08','2024-06-02 03:57:08',2,10,NULL,NULL),(25,'logan','caraszi','logancaraszi@gmail.com','$2b$10$sD.q8J2cjLELy9HgxFC4gO7mBO5CEQXUHUILP38aa7kguaLsAe4t6','2024-06-10 20:32:07','2024-06-10 20:32:07',3,10,'I am awesome!',NULL),(26,'julia','holt','juliagholt@hotmail.com','$2b$10$DXNx0nVD/L4cUk8N40bwlO8PYXuUNic30CyaYq8m9urhy74Zyeg86','2024-06-19 14:05:33','2024-06-19 14:05:33',3,10,NULL,NULL),(27,'divine','emeh','ifyemeh46@gmail.com','$2b$10$CCTQVNRICw7AfChe/WyIXex1JUiQ0wEnUBLg58Zd.JLSOx.322oje','2024-06-20 03:54:17','2024-06-20 03:54:17',3,10,NULL,NULL),(28,'arad','m','aradjmoghadam@gmail.com','$2b$10$74tbdpC6NYrMeJw4SrvoqeYBGKVW.kNYV5bMomEczN9PorQck6aD6','2024-07-15 20:13:50','2024-07-15 20:13:50',3,10,'null',NULL),(29,'logan','caraszi','lo37929@ucf.edu','$2b$10$.UErJK1FOshAylrGCcZbmOn/DcygIRO3F5eYtekX.M1POFOUPWMTq','2024-07-26 15:08:54','2024-07-26 15:08:54',1,NULL,NULL,NULL),(30,'logan','caraszi','lo3792961@ucf.edu','$2b$10$oqv.ocgcM1V4TN9iPvvpiOhEBwHL0g5m9aeSHQ.CngvK7ZMlyXIrO','2024-07-26 15:10:02','2024-07-26 15:10:02',1,11,NULL,NULL),(31,'james','philip','jamesphilip@gmail.com','$2b$10$mcCMIYhwWSZiPUdBEChyr.d3QrxE1mgInXyxgT/wto0JWB9K/BY/O','2024-07-26 15:11:59','2024-07-26 15:11:59',1,14,NULL,NULL),(32,'philip','james','philip123@gmail.com','$2b$10$RPUfi9YjgzsfLRbAylt2I.YUE0wpKQwRVSKMrBhLiRdOUiV2yFFHO','2024-07-26 15:15:23','2024-07-26 15:15:23',3,14,NULL,NULL),(33,'micheal','lope','mlope@gmail.com','$2b$10$8hVJcgSLdO82TkyUgC6RF.35VTy2VLRfEfFYlUSCifyh4uNXUMgC6','2024-07-26 15:16:05','2024-07-26 15:16:05',2,14,NULL,NULL),(34,'wrfwe','efewfe','ewe@gmail.com','$2b$10$m6qGXlGdYiAGlFk.iqewue077gCwRzAZ8jR8twm5r0krQesV50oBu','2024-07-26 15:18:06','2024-07-26 15:18:06',3,14,NULL,NULL),(35,'wfew','fewfwef','wefe@gmail.com','$2b$10$GChJaEL.IinRB4PGBPTM0eCsES.gH/yjrEo1eEdfsCOlxTEAOty/.','2024-07-26 15:18:22','2024-07-26 15:18:22',3,14,NULL,NULL),(36,'test','name','testname@gmail.com','$2b$10$c2u3.gWXKPMxMUONVrMxt.NBmqXqVrTgXa/JuYYozcslp.TpQaflK','2024-07-26 15:20:01','2024-07-26 15:20:01',3,14,'My about','uploads/profileimage/1722007279130-profilepicture-1.jpg'),(37,'logan','caraszi','lcaraszi@gmail.com','$2b$10$An96LmdY0Y94dcFlpMNUJO9bHS2qyk2Z1KQXypJpYyWQU6x690pA6','2024-07-26 16:38:16','2024-07-26 16:38:16',2,10,NULL,NULL),(38,'logan','caraszi','lc@gmail.com','$2b$10$Ttey7hFFKT8pzx3k0bCDfOfb.iHI8I3gW0z88Ea/64FI8RSUq66Ly','2024-07-26 16:42:58','2024-07-26 16:42:58',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Visibility`
--

DROP TABLE IF EXISTS `Visibility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Visibility` (
  `visibility_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`visibility_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Visibility`
--

LOCK TABLES `Visibility` WRITE;
/*!40000 ALTER TABLE `Visibility` DISABLE KEYS */;
INSERT INTO `Visibility` VALUES (1,'Public','2024-03-31 20:56:53','2024-03-31 20:56:53'),(2,'Private','2024-03-31 20:56:53','2024-03-31 20:56:53'),(3,'RSO','2024-03-31 20:56:53','2024-03-31 20:56:53');
/*!40000 ALTER TABLE `Visibility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations`
--

DROP TABLE IF EXISTS `knex_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations`
--

LOCK TABLES `knex_migrations` WRITE;
/*!40000 ALTER TABLE `knex_migrations` DISABLE KEYS */;
INSERT INTO `knex_migrations` VALUES (1,'20240309180054_create_users_table.ts',1,'2024-03-09 13:05:14'),(2,'20240309180103_create_university_table.ts',2,'2024-03-09 13:05:21'),(3,'20240309180059_create_rso_table.ts',3,'2024-03-09 13:05:30'),(4,'20240317012804_create_category_table.ts',4,'2024-03-17 16:12:24'),(5,'20240321034712_create_role_table.ts',5,'2024-03-20 23:49:49'),(6,'20240331205222_create_visibility_table.ts',6,'2024-03-31 16:53:49'),(7,'20240331205812_create_event_schedule_table.ts',7,'2024-03-31 17:00:29'),(8,'20240317195511_add_col_user_table.ts',8,'2024-04-01 19:56:57');
/*!40000 ALTER TABLE `knex_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `knex_migrations_lock`
--

DROP TABLE IF EXISTS `knex_migrations_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `knex_migrations_lock` (
  `index` int unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `knex_migrations_lock`
--

LOCK TABLES `knex_migrations_lock` WRITE;
/*!40000 ALTER TABLE `knex_migrations_lock` DISABLE KEYS */;
INSERT INTO `knex_migrations_lock` VALUES (1,0);
/*!40000 ALTER TABLE `knex_migrations_lock` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-25 20:30:59
