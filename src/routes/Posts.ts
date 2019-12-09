import { PostDao } from '@daos';
import { logger } from '@shared';
import { Request, Response, Router, Express } from 'express';
import {BAD_REQUEST, CREATED, NOT_FOUND, OK} from 'http-status-codes';

const router = Router();
const postDao = new PostDao();

/******************************************************************************
 *                      Get All Posts - "GET /api/posts"
 ******************************************************************************/

router.get('', async (req: Request, res: Response) => {
    try {
        const posts = await postDao.getAll();
        return res.status(OK).json({posts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get All Posts For User - "GET /api/posts/timeline"
 ******************************************************************************/

router.get('/timeline', async (req: Request, res: Response) => {
    try {
        // const { id } = req.params;
        // const posts = await postDao.getAllForUser(id);
        const posts = await postDao.getAll();
        return res.status(OK).json({posts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get All Posts Of User - "GET /api/posts/user/:id"
 ******************************************************************************/

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await postDao.getAllOfUser(id);
        return res.status(OK).json({posts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                      Get All Comments Of Post - "GET /api/posts/comments/:id"
 ******************************************************************************/

router.get('/comments/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const posts = await postDao.getCommentsOfPost(id);
        return res.status(OK).json({posts});
    } catch (err) {
        logger.error(err.message, err);
        return res.status(NOT_FOUND).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Add One - "POST /api/posts"
 ******************************************************************************/

router.post('/', async (req: Request, res: Response) => {
    try {
        const post = req.body;
        await postDao.add(post);
        return res.status(CREATED).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                       Update - "PUT /api/posts"
 ******************************************************************************/

router.put('', async (req: Request, res: Response) => {
    try {
        const post = req.body;
        /*
        if (!post) {
            return res.status(BAD_REQUEST).json({
                error: paramMissingError,
            });
        } */
        await postDao.update(post);
        return res.status(OK).end();
    } catch (err) {
        logger.error(err.message, err);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    }
});

/******************************************************************************
 *                    Delete - "DELETE /api/posts/:id"
 ******************************************************************************/

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await postDao.delete(id);
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
