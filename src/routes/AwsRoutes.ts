import { Request, Response, Router } from 'express';
const AWS = require('aws-sdk');
import { AWSConfig } from '../config/appConfig';

// Configure AWS SDK
const INSTANCE_ID = AWSConfig.INSTANCE_ID;

AWS.config.update({
    accessKeyId: AWSConfig.accessKeyId,
    secretAccessKey: AWSConfig.secretAccessKey,
    region: AWSConfig.region
});

const ec2 = new AWS.EC2();

const router = Router();


//stop aws instance
router.post('/stop_instance', (req: Request, res: Response) => {
    // const { instanceId } = req.body;

    // const params = {
    //     InstanceIds: [instanceId]
    // };

    const params = {
        InstanceIds: [`${INSTANCE_ID}`]
    };

    ec2.stopInstances(params, (err:any, data:any) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});

//Start Instance
router.post('/start_instance', (req: Request, res: Response) => {
    const { instanceId, userData } = req.body;

    const params = {
        InstanceIds: [instanceId],
        // `UserData` is only valid when launching new instances
        // For existing instances, you can use AWS Systems Manager or another method to pass data
        UserData: Buffer.from(userData).toString('base64')
    };

    ec2.startInstances(params, (err:any, data:any) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(data);
        }
    });
});


export default router;