import {Request, Response, Router} from 'express';
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from 'http-status-codes';
import {logger} from '@shared';
import {ReactionDao} from '@daos';

const router = Router();
const reactionDao = new ReactionDao();

/******************************************************************************
 *                      Get All Reactions For Post - "GET /api/reactions/post/:id"
 ******************************************************************************/

router.get('/post/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await reactionDao.getAllOfPost(id);
        return res.status(OK).json({posts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "REACTION /api/reactions"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    try {
        const reaction = req.body;
        await reactionDao.add(reaction);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/reactions/:id"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await reactionDao.delete(id);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
