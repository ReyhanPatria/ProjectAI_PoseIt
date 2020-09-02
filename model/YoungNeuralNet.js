class YoungNeuralNet {
    constructor() {
        this.neuralNetOptions = {
            inputs: 34,
            outputs: 1,
            task: "classification",
            debug: true
        };

        this.pose = [{
                label: "Angkat Kaki Belakang Kiri",
                image: loadImage("assets/pose/Kaki Angkat Belakang Kanan.jpg")
            }, {
                label: "Angkat Kaki Belakang Kanan",
                image: loadImage("assets/pose/Kaki Angkat Belakang Kiri.jpg")
            }, {
                label: "hand_push_left",
                image: loadImage("assets/pose/Tangan Dorong Kiri.jpg")
            }, {
                label: "hand_push_right",
                image: loadImage("assets/pose/Tangan Dorong Kanan.jpg")
            }, {
                label: "body_tilt_left_with_hand",
                image: loadImage("assets/pose/Badan Miring Kiri Dengan Tangan.jpg")
            }, {
                label: "body_tilt_right_with_hand",
                image: loadImage("assets/pose/Badan Miring Kanan Dengan Tangan.jpg")
            }
        ];

        this.model = [
            {
                modeName: "angkat_kaki_belakang",
                instance: ml5.neuralNetwork(this.neuralNetOptions),
                modelDetails: {
                    model: 'model/model_angkat_kaki_belakang/model.json',
                    metadata: 'model/model_angkat_kaki_belakang/model_meta.json',
                    weights: 'model/model_angkat_kaki_belakang/model.weights.bin'
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
}