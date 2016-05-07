// Fixture data

let randomDate = function() {
    const start = new Date(2012, 1, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

if (Posts.find().count() === 0) {
  var now = new Date().getTime();

  // create two users
  var vietId = Meteor.users.insert({
    profile: { name: 'Viet Le' }
  });
  var viet = Meteor.users.findOne(vietId);
  var mishaId = Meteor.users.insert({
    profile: { name: 'Misha Dog' }
  });
  var misha = Meteor.users.findOne(mishaId);

  var telescopeId = Posts.insert({
    title: 'Introducing Telescope',
    userId: misha._id,
    author: misha.profile.name,
    url: 'http://sachagreif.com/introducing-telescope/',
    submitted: new Date(now - 7 * 3600 * 1000)
  });

  Comments.insert({
    postId: telescopeId,
    userId: viet._id,
    author: viet.profile.name,
    submitted: new Date(now - 5 * 3600 * 1000),
    body: 'Interesting project Sacha, can I get involved?'
  });

  Comments.insert({
    postId: telescopeId,
    userId: misha._id,
    author: misha.profile.name,
    submitted: new Date(now - 3 * 3600 * 1000),
    body: 'You sure can Tom!'
  });

  Posts.insert({
    title: 'Meteor',
    userId: viet._id,
    author: viet.profile.name,
    url: 'http://meteor.com',
    submitted: new Date(now - 10 * 3600 * 1000)
  });

  Posts.insert({
    title: 'The Meteor Book',
    userId: viet._id,
    author: viet.profile.name,
    url: 'http://themeteorbook.com',
    submitted: new Date(now - 12 * 3600 * 1000)
  });
}
