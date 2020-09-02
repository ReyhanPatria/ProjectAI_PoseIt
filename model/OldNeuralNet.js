class OldNeuralNet {
    constructor() {
        this.neuralNetOptions = {
            inputs: 34,
            outputs: 1,
            task: "classification",
            debug: true
        };

        this.poseLabel = [
            "head_tilt_left_with_hand",
            "head_tilt_right_with_hand",
            "hand_push_left",
            "hand_push_right",
            "body_tilt_left_with_hand",
            "body_tilt_right_with_hand"
        ];

        this.model = [
            {
                modeName: "head_tilt",
                instance: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_head_tilt_with_hand/model.json',
                    metadata: 'model/model_head_tilt_with_hand/model_meta.json',
                    weights: 'model/model_head_tilt_with_hand/model.weights.bin'
                }
            }, 
            {
                modeName: "hand_push",
                instance: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_hand_push/model.json',
                    metadata: 'model/model_hand_push/model_meta.json',
                    weights: 'model/model_hand_push/model.weights.bin'
                }
            }, 
            {
                modeName: "body_tilt",
                instance: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_body_tilt_with_hand/model.json',
                    metadata: 'model/model_body_tilt_with_hand/model_meta.json',
                    weights: 'model/model_body_tilt_with_hand/model.weights.bin'
                }
            }
        ];

        this.loadNeuralNet();
    }

    loadNeuralNet() {
        for(let nn in this.model) {
            let modelDetails = this.model[nn].modelDetails;
            this.model[nn].instance.load(modelDetails, function() {
                console.log(nn + " loaded");
            })
        }
    }

    classifyPose(inputs) {
        this.model[0].predict(inputs, function(error, result) {
            if(error) {
                console.log(error);
                return;
            }
        
            console.log(result[0].label);
        });
    }
}