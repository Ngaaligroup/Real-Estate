import {profession} from '../models/professional';

/**
 *
 *
 * @export
 * @class TaskManager
 */
export class TaskManager {
    /**
       *Creates an instance of TaskManager.
       * @param {*} req - express request object
       * @param {*} res - express response object
       * @memberof TaskManager
       */
    constructor(req, res) {
      this.req = req;
      this.res = res;
    }

insertUser(){
    const newProfessional = new profession(this.req.body);
    // console.log(this.req.body)
    newProfessional.save((error, todousers) => {
      if (error) {
        const response = error.message;
        this.res.json({
          error: response,
        });
      } else {
      this.res.json(todousers);
      }
    })
    console.log(newProfessional);
  }
}
