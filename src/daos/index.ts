const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();
let reactionDaoPath = './Reaction/ReactionDao';
let postDaoPath = './Post/PostDao';

if (usingMockDb === 'true') {
    reactionDaoPath += '.mock';
    postDaoPath += '.mock';
}

// tslint:disable:no-var-requires
export const { ReactionDao } = require(reactionDaoPath);
export const { PostDao } = require(postDaoPath);
