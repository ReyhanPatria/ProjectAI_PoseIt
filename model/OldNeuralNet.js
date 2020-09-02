class OldNeuralNet {
    constructor() {
        this.neuralNetOptions = {
            inputs: 34,
            outputs: 1,
            task: "classification",
            debug: true
        };

        this.neuralNet = {
            head_tilt: {
                model: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_head_tilt_with_hand/model.json',
                    metadata: 'model/model_head_tilt_with_hand/model_meta.json',
                    weights: 'model/model_head_tilt_with_hand/model.weights.bin'
                }
            }, 
            hand_push: {
                model: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_hand_push/model.json',
                    metadata: 'model/model_hand_push/model_meta.json',
                    weights: 'model/model_hand_push/model.weights.bin'
                }
            },
            body_tilt: {
                model: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_body_tilt_with_hand/model.json',
                    metadata: 'model/model_body_tilt_with_hand/model_meta.json',
                    weights: 'model/model_body_tilt_with_hand/model.weights.bin'
                }
            }
        };

        this.loadNeuralNet();
    }

    loadNeuralNet() {
        for(let nn in this.neuralNet) {
            let modelDetails = this.neuralNet[nn].modelDetails;
            this.neuralNet[nn].model.load(modelDetails, function() {
                console.log(nn + " loaded");
            })
        }
    }

    classifyPose(inputs) {
        this.neuralNet[0].predict(inputs, function(error, result) {
            if(error) {
                console.log(error);
                return;
            }
        
            console.log(result[0].label);
        });
    }
}