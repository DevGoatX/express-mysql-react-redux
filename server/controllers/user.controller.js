import bcrypt from 'bcrypt';
import HttpStatus from 'http-status-codes';
import User from '../models/user.model';

/**
 * Store new user
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export async function store(req, res) {
    const {email} = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);

    User.query({
        where: {email: email},
    })
    .fetch()
    .then((user) => {
        console.log('-------------- user: ', user);
        res.json({
            success: false,
            error: 'The email address already exists. Please use another email.'
        });

    })
    .catch(() => {
        new User({
            email, password
        }).save()
            .then(user => res.json({
                    success: true,
                    data: user.toJSON()
                })
            )
            .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    error: err
                })
        );
    });
    
}