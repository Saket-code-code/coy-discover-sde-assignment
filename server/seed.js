
const people = [
  ['Aarav',24,'Designing interfaces and collecting little moments.','Delhi','Design, Coffee, Photography'],
  ['Meera',22,'Usually found between a bookstore and a chai spot.','Mumbai','Books, Music, Travel'],
  ['Kabir',25,'Weekend hikes, weekday spreadsheets.','Bengaluru','Hiking, Startups, Food'],
  ['Ananya',23,'Making playlists for people who did not ask.','Pune','Music, Art, Dogs'],
  ['Ishaan',26,'Curious about how things work.','Hyderabad','Technology, Cycling, Films'],
  ['Riya',22,'Sunsets are a personality trait.','Delhi','Travel, Dance, Food'],
  ['Dev',24,'Building things and breaking them gently.','Noida','Coding, Gaming, Cricket'],
  ['Sana',23,'A little bit of poetry, a lot of pasta.','Jaipur','Writing, Cooking, Museums'],
  ['Arjun',27,'Mountains over malls, always.','Chandigarh','Trekking, Fitness, Nature'],
  ['Nisha',24,'Trying every café at least once.','Gurugram','Coffee, Fashion, Art'],
  ['Vihaan',22,'Film camera enthusiast.','Kolkata','Photography, Cinema, Music'],
  ['Tanvi',25,'Big fan of small adventures.','Chennai','Travel, Surfing, Books'],
  ['Rehan',26,'Food first. Everything else later.','Lucknow','Food, Football, Movies'],
  ['Aditi',21,'Learning something new every day.','Indore','Painting, Tech, Yoga'],
  ['Rohan',25,'I will beat you at board games.','Delhi','Board games, Chess, Comedy'],
  ['Kiara',23,'Dancing like nobody is watching.','Mumbai','Dance, Fitness, Music'],
  ['Nikhil',24,'Ocean air fixes most things.','Goa','Beach, Diving, Travel'],
  ['Zoya',22,'Plant parent with commitment issues.','Pune','Plants, Baking, Books'],
  ['Manav',27,'Running toward the next finish line.','Bengaluru','Running, Coffee, Tech'],
  ['Ira',24,'Art galleries and long conversations.','Jaipur','Art, History, Travel'],
  ['Advik',23,'Avid badminton player. Average singer.','Noida','Badminton, Music, Food'],
  ['Pihu',25,'Collecting recipes and passport stamps.','Hyderabad','Cooking, Travel, Culture'],
  ['Kunal',26,'A good book is a good weekend.','Kolkata','Books, Cricket, Writing'],
  ['Manya',22,'Here for the dogs, staying for the people.','Chandigarh','Dogs, Nature, Movies'],
  ['Dhruv',24,'Making ordinary days feel cinematic.','Gurugram','Films, Photography, Cycling'],
  ['Aaliya',26,'Equal parts ambition and daydreaming.','Mumbai','Startups, Fashion, Yoga'],
  ['Yash',23,'I make a mean cup of filter coffee.','Chennai','Coffee, Music, Cooking'],
  ['Simran',24,'Always up for a spontaneous road trip.','Delhi','Road trips, Food, Music'],
  ['Ritvik',25,'Learning guitar, slowly but surely.','Pune','Guitar, Gaming, Tech'],
  ['Lavanya',23,'Finding joy in the details.','Bengaluru','Design, Yoga, Books'],
  ['Omkar',27,'Football on weekends, films at night.','Kochi','Football, Cinema, Travel'],
  ['Diya',22,'A little sunshine and a lot of curiosity.','Ahmedabad','Art, Dance, Nature']
];

const maleNames = new Set([
  'Aarav', 'Kabir', 'Ishaan', 'Dev', 'Arjun', 'Vihaan',
  'Rehan', 'Rohan', 'Nikhil', 'Manav', 'Advik', 'Kunal',
  'Dhruv', 'Yash', 'Ritvik', 'Omkar'
]);

const malePhotos = [
  '1500648767791-00dcc994a43e',
  '1506794778202-cad84cf45f1d',
  '1507003211169-0a1dd7228f2d'
];

const femalePhotos = [
  '1534528741775-53994a69daeb',
  '1531123897727-8f129e1688ce',
  '1524504388940-b1c1722653e1'
];

export const profiles = people.map((p, i) => {
  const isMale = maleNames.has(p[0]);
  const photoList = isMale ? malePhotos : femalePhotos;
  const photoId = photoList[i % photoList.length];

  return {
    id: `p${i + 1}`,
    name: p[0],
    age: p[1],
    bio: p[2],
    city: p[3],
    interests: p[4].split(', '),
    photo: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=900&q=85`,
    incomingLike: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28].includes(i)
  };
});
