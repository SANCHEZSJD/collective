const typeDefs = `
type Userprofile {
    id:ID
    name: String
}
type User {
    id:ID
    username: String!
    password: String!
    email: String!
    userprofile: Userprofile!
}
type View {
    id:ID,
    name: String
    title: String
    parent: String
    have_child: Boolean
    index: Int
}
type Query { 
    me: User!
    users(id:String): [User],
    userprofiles(id:String): [Userprofile]
    views(id:String): [View],
}
type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): String!

    userprofileAdd(name: String!): Userprofile! 
    userprofileUpdate(id:ID!, name: String!): Userprofile!
    userprofileRemove(id:ID!): Userprofile!

    userUpdate(id:ID!, username: String!, password: String!, userprofile: ID!): User!
    userRemove(id:ID!): User!

    viewAdd(name: String, title: String!, parent:String, have_child:Boolean, index: Int): View!
    viewUpdate(id:ID!,name: String, title: String!, parent:String, have_child:Boolean, index: Int): View!
    viewRemove(id:ID!): View!
}
`;

module.exports = {
    typeDefs
}