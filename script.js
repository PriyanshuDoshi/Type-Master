$(document).ready(function(){
    $("#text_to_type").focus();
    let startsec;
    let endtime;
    let sec = document.getElementById("time");
    let acc = document.getElementById("accuracy");
    let wpm = document.getElementById("wpm");
    let i = 0;
    let arr1 = [
        "hello world how are you hope you are doing well",
        "fair one your village is so lovely i am totally enchanted after coming here",
        "every evening your veil flutters over my eyes every night a procession of memories arrives with every breath i take your fragrance surrounds me bringing a sweet enchanting message even the beats of my heart sing your songs moment by moment you stay close to my heart"
    ];
    let arr2 = [10,14,47];
    
    $("#text_to_type").text(arr1[i]);
    
    $("#next").click(function(){
        if(i < arr1.length-1){
            i++;
        } else {
            i = 0;
        }
        $("#text_to_type").text(arr1[i]);
        $("#input_text").focus();
    });
    
    let timerStarted = false;
    
    $("#input_text").on('input', function(){
        if (!timerStarted) {
            startsec = new Date().getTime();
            timerStarted = true;
        }
    });
    
    $(document).keypress(function(e){
        if(e.which == 13){
            $("#input_text").blur();
            endtime = new Date().getTime();
            let timegone = (endtime - startsec) / 1000;
            var accuracy = calculate_accuracy().toFixed(2);
            
            $("#result").fadeIn(400, function() {
                $('html, body').animate({
                    scrollTop: $("#result").offset().top
                }, 800, 'swing');
            });
            
            sec.textContent = "Time taken: " + timegone + " sec";
            acc.textContent = "Accuracy: " + accuracy + "%";
            let speed = (60 * arr4.length / timegone).toFixed(2);
            wpm.textContent = "Words Per Minute: " + ((speed * accuracy) / 100).toFixed(2);
            raw.textContent = "Raw WPM: " + speed;
        }
    });
    
    let arr3 = [];
    let arr4 = [];
    let k = 0;
    let l = 0;
    
    function calculate_accuracy(){
        let ref = $("#text_to_type").text().trim().replace(/\s+/g, ' ');
        let typed = $("#input_text").val().trim().replace(/\s+/g, ' ');
        
        if (typed === "") {
            return 0;
        }
        
        arr3 = ref.split(" ");
        arr4 = typed.split(" ");
        let total_char=ref.length;
        let matched_char=0;
        let total_words = arr3.length;
        let matched_words = 0;
        
        for (let b = 0; b < total_words; b++) {
            if (arr3[b] === arr4[b]) {
                matched_words++;
            }
            // for(let c=0;c<arr3[b].length;c++){
            //     if(arr3[b][c]==arr4[b][c]){
            //         matched_char++;
            //     }
            // }
        }
        // for(let c=0;c<ref.length;c++){
        //     if(ref[c]==typed[c]){
        //         matched_char++;
        //     }
        // }
        
        return (matched_words / total_words) * 100;
        
        // return (matched_char / total_char) * 100;
    }
    
    $("#reset").click(function(){
        sec.textContent = "";
        $("#input_text").val("");
        $("#result").fadeOut();
        timerStarted = false;
        $("#input_text").focus();
        
        $('html, body').animate({
            scrollTop: $("h1").offset().top
        }, 800, 'swing');
    });
});
