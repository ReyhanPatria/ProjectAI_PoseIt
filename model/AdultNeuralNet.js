class AdultNeuralNet {
    constructor() {
        localStorage.setItem("loaded", 0);

        this.neuralNetOptions = {
            inputs: 34,
            outputs: 1,
            task: "classification",
            debug: true
        };

        this.model = [
            {
                modeName: "angkat_kaki",
                instance: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_angkat_kaki/model.json',
                    metadata: 'model/model_angkat_kaki/model_meta.json',
                    weights: 'model/model_angkat_kaki/model.weights.bin'
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
                localStorage.setItem("loaded", localStorage.getItem("loaded") + 1);
            })
        }
    }
}