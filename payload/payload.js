$(document).ready(function(){
    chrome.storage.sync.get('active', function(result){
        if (result.active == true) {
            init();
        }
    });
});

function findAndReplace(searchText, replacement, searchNode) {
    if (!searchText || typeof replacement === 'undefined') {
        // Throw error here if you want...
        return;
    }
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'gi') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'input';
    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText, replacement, currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data) ) {
            continue;
        }
        var parent = currentNode.parentNode,
            frag = (function(){
                var html = currentNode.data.replace(regex, replacement),
                    wrap = document.createElement('div'),
                    frag = document.createDocumentFragment();
                wrap.innerHTML = html;
                while (wrap.firstChild) {
                    frag.appendChild(wrap.firstChild);
                }
                return frag;
            })();
        parent.insertBefore(frag, currentNode);
        parent.removeChild(currentNode);
    }
}

function init() {   
    var self = {
        statics: [
            ['Game of Thrones', 'Friends of Thrones'],
            ['GameofThrones', 'FriendsofThrones'],
            ['Game-of-Thrones', 'Friends-of-Thrones'],
        ],
        names: [
            'Tyrion',
            'Cersei',
            'Daenerys',
            'Arya',
            'Jon',
            'Sansa',
            'Jorah',
            'Jaime',
            'Sandor',
            'Theon',
            'Samwell',
            'Tywin',
            'Joffrey',
            'Catelyn',
            'Bran',
            'Petyr',
            'Varys',
            'Brienne',
            'Robb',
            'Bronn',
            'Shae',
            'Gendry',
            'Ygritte',
            'Margaery',
            'Stannis',
            'Missandei',
            'Davos',
            'Maester',
            'Melisandre',
            'Roose',
            'Gilly',
            'Tormund',
            'Jeor',
            'Talisa',
            'Eddard',
            'Khal',
            'Ramsay',
            'Olenna',
            'Robert',
            'Oberyn',
            'Daario',
            'Tommen',
            'Viserys',
            'Mance',
            'Ellaria',
            'Hallyne',
        ],
        lastNames: [
            'Snow',
            'Stark',
            'Targaryen',
            'Lannister',
            'Martell',
            'Bolton',
            'Tyrell',
            'Baratheon',
            'Tully',
            'Greyjoy',
            'FarberArryn',
            'Forrester',
            'Baelish',
            'Tarth',
            'Children of the Forrest',
            'white walker',
        ],
        locations: [
            'Bravos',
            'Dome',
            'The Wall',
            'Harrenhall',
            'Winterfell',
            'King\'s Landing',
            'Casterly Rock',
            'Castle Black',
            'Volantis',
            'Qarth',
            'Dragonstone',
            'Meereen',
            'Betond the Wall',
            'Riverrun',
            'Storm\'s End',
            'Keep',
            'Highgarden',
            'Pyke',
            'North',
        ],
        friendsNames: [
            'Chandler',
            'Monica',
            'Phoebe',
            'Rachel',
            'Gunther',
            'Racher',
            'Marcel',
            'Joey',
            'Judy',
            'Ugly Naked Guy',
            'Janice',
            'Mike Hannigan',
            'Carol',
            'Emily',
            'Susan Bunch',
            'Dr. Richard Burke',
            'Estelle Leonard',
            'Charlie Wheeler',
            'Ursula ',
            'Frank Buffay, Jr.',
            'Julie',
            'Tag Jones',
            'Mona',
            'Barry Farber',
            'Mark Robinson',
            'Pete Becker',
            'Alice Knight Buffay',
            'Kathy',
            'Mr. Zelner',
            'Dr. Long',
            'Mr. Heckles',
            'David',
            'Nora Tyler Bing',
            'Mr. Treeger',
            'Joshua Burgin',
            'Janine LaCroix',
            'Elizabeth Stevens',
            'Erica',
            'Paolo',
            'Leonard Green',
            'Sophie',
            'Gary',
            'Jill Green',
            'Amy Green',
            'Stu',
            'Goose',
        ],
        friendsLastNames: [
            'Geller',
            'Bing',
            'Green',
            'Buffay',
            'Tribbiani',
            'Hannigan',
            'Goralnik',
        ],
        friendsLocations: [
            'Monica\'s appartment',
            'Central Perk',
            'Chandler and Joey\'s apartment',
            'Phoebe\'s apartment',
            'Ross\' Third apartment',
            'Javu',
            'Allesndro\'s Monica & Chandler\'s apartment',
            'Moondance Diner',
            'Living',
            'Lincon\'s High School',
            'Bloomingdale\'s',
            'The Museum',
            'Becco',
            'Marce\'s Tulsa',
            'Ernie\'s Country House',
            'New York',
            'University',
            'Street',
        ],
        handleSpoilers: function(statics,names,lastNames,locations) {
            // Search for statics
             $.each(statics, function(i, val){
                var randInt = Math.floor(Math.random() * statics.length);
                findAndReplace(val[0], val[1]); 
            });
            // Search for names
            $.each(names, function(i, val){
                var randInt = Math.floor(Math.random() * self.friendsNames.length);
                findAndReplace(val, self.friendsNames[randInt]); 
            });
            // Search for lastNames
            $.each(lastNames, function(i, val){
                var randInt = Math.floor(Math.random() * self.friendsLastNames.length);
                findAndReplace(val, self.friendsLastNames[randInt]);
            });
            // // Search for locations
            $.each(locations, function(i, val){
                var randInt = Math.floor(Math.random() * self.friendsLocations.length);
                findAndReplace(val, self.friendsLocations[randInt]); 
            });

            var timer = setTimeout(function(){
                self.handleSpoilers(self.statics,self.names,self.lastNames,self.locations);
            }, 100);

            console.log('finished spoiling Friends');
            
            clearTimeout(timer);
        }
    };

    self.handleSpoilers(self.statics,self.names,self.lastNames,self.locations);
}