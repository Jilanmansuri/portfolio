const q = 'query userProfileCalendar($username: String!, $year: Int) { matchedUser(username: $username) { userCalendar(year: $year) { activeYears streak totalActiveDays submissionCalendar } } }';
const v = {username: 'Jilan2410'};
const targetUrl = 'https://leetcode.com/graphql?query=' + encodeURIComponent(q) + '&variables=' + encodeURIComponent(JSON.stringify(v));
const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(targetUrl);
fetch(url).then(r => r.text()).then(console.log).catch(console.error);
