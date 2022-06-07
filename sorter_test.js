  //*********************************************************

 var voteMembers = new Array();
 var voteParent = new Array();
 var voteEqual = new Array();
 var voteRec = new Array();
 var voteCmp1, voteCmp2;
 var voteHead1, voteHead2;
 var voteNrec;
 var numQuestion;
 var voteTotalSize;
 var voteFinishSize;
 var voteFinishFlag;

 //The initialization of the variable+++++++++++++++++++++++++++++++++++++++++++++
 function initVoteList() {
     var n = 0;
     var mid;
     var i;

     //The sequence that you should sort
     voteMembers[n] = new Array();
     for (i = 0; i < voteNamMember.length; i++) {
         voteMembers[n][i] = i;
     }
     voteParent[n] = -1;
     voteTotalSize = 0;
     n++;

     for (i = 0; i < voteMembers.length; i++) {
         if (voteMembers[i].length >= 2) {
             mid = Math.ceil(voteMembers[i].length / 2);
             voteMembers[n] = new Array();
             voteMembers[n] = voteMembers[i].slice(0, mid);
             voteTotalSize += voteMembers[n].length;
             voteParent[n] = i;
             n++;
             voteMembers[n] = new Array();
             voteMembers[n] = voteMembers[i].slice(mid, voteMembers[i].length);
             voteTotalSize += voteMembers[n].length;
             voteParent[n] = i;
             n++;
         }
     }

    //Preserve this sequence
     for (i = 0; i < voteNamMember.length; i++) {
         voteRec[i] = 0;
     }
     voteNrec = 0;

     //List that keeps your results

     //Value of link initial

     // Value of link initial
     for (i = 0; i <= voteNamMember.length; i++) {
         voteEqual[i] = -1;
     }

     voteCmp1 = voteMembers.length - 2;
     voteCmp2 = voteMembers.length - 1;
     voteHead1 = 0;
     voteHead2 = 0;
     numQuestion = 1;
     voteFinishSize = 0;
     voteFinishFlag = 0;
 }


 function sortVoteList(flag) {
     var i;
     var str;
     //rec preservation

     if (flag < 0) {
         voteRec[voteNrec] = voteMembers[voteCmp1][voteHead1];
         voteHead1++;
         voteNrec++;
         voteFinishSize++;
         while (voteEqual[voteRec[voteNrec - 1]] != -1) {
             voteRec[voteNrec] = voteMembers[voteCmp1][voteHead1];
             voteHead1++;
             voteNrec++;
             voteFinishSize++;
         }
     } else if (flag > 0) {
         voteRec[voteNrec] = voteMembers[voteCmp2][voteHead2];
         voteHead2++;
         voteNrec++;
         voteFinishSize++;

         while (voteEqual[voteRec[voteNrec - 1]] != -1) {
             voteRec[voteNrec] = voteMembers[voteCmp2][voteHead2];
             voteHead2++;
             voteNrec++;
             voteFinishSize++;
         }
     } else {
         voteRec[voteNrec] = voteMembers[voteCmp1][voteHead1];
         voteHead1++;
         voteNrec++;
         voteFinishSize++;
         while (voteEqual[voteRec[voteNrec - 1]] != -1) {
             voteRec[voteNrec] = voteMembers[voteCmp1][voteHead1];
             voteHead1++;
             voteNrec++;
             voteFinishSize++;
         }
         voteEqual[voteRec[voteNrec - 1]] = voteMembers[voteCmp2][voteHead2];
         voteRec[voteNrec] = voteMembers[voteCmp2][voteHead2];
         voteHead2++;
         voteNrec++;
         voteFinishSize++;
         while (voteEqual[voteRec[voteNrec - 1]] != -1) {
             voteRec[voteNrec] = voteMembers[voteCmp2][voteHead2];
             voteHead2++;
             voteNrec++;
             voteFinishSize++;
         }
     }



     //Processing after finishing with one list

     if (voteHead1 < voteMembers[voteCmp1].length && voteHead2 == voteMembers[voteCmp2].length) {
         //List the remainder of voteCmp2 copies, list voteCmp1 copies when finished scanning
         while (voteHead1 < voteMembers[voteCmp1].length) {
             voteRec[voteNrec] = voteMembers[voteCmp1][voteHead1];
             voteHead1++;
             voteNrec++;
             voteFinishSize++;
         }
     } else if (voteHead1 == voteMembers[voteCmp1].length && voteHead2 < voteMembers[voteCmp2].length) {
         //List the remainder of voteCmp1 copies, list voteCmp2 copies when finished scanning
         while (voteHead2 < voteMembers[voteCmp2].length) {
             voteRec[voteNrec] = voteMembers[voteCmp2][voteHead2];
             voteHead2++;
             voteNrec++;
             voteFinishSize++;
         }
     }



     //When it arrives at the end of both lists

     //Update a pro list

     if (voteHead1 == voteMembers[voteCmp1].length && voteHead2 == voteMembers[voteCmp2].length) {
         for (i = 0; i < voteMembers[voteCmp1].length + voteMembers[voteCmp2].length; i++) {
             voteMembers[voteParent[voteCmp1]][i] = voteRec[i];
         }

         voteMembers.pop();
         voteMembers.pop();
         voteCmp1 = voteCmp1 - 2;
         voteCmp2 = voteCmp2 - 2;
         voteHead1 = 0;
         voteHead2 = 0;

         //Initialize the rec before performing the new comparison

         if (voteHead1 == 0 && voteHead2 == 0) {
             for (i = 0; i < voteNamMember.length; i++) {
                 voteRec[i] = 0;
             }
             voteNrec = 0;
         }
     }



     if (voteCmp1 < 0) {
         str = "battle #" + (numQuestion - 1) + "<br>" + Math.floor(voteFinishSize * 100 / voteTotalSize) + "% sorted.";
         document.getElementById("voteBattleNumber").innerHTML = str;
         showVoteResult();
         voteFinishFlag = 1;
     } else {
         showVoteImage();
     }
 }



 //The results+++++++++++++++++++++++++++++++++++++++++++++++

 //&#38918;&#20301;=Rank/Grade/Position/Standing/Status

 //&#21517;&#21069;=Identification term

 function showVoteResult() {
     var ranking = 1;
     var trueRank = 1;
     var sameRank = 1;
     var rankScoreCal = [];
     var rankSizeCal = [];
     var maxVoteScore = voteNamMember.length;
     var str = "";
     var i;
     str += "<table style=\"width:200px; font-size:18px; line-height:120%; margin-left:auto; margin-right:auto; border:1px solid #000; border-collapse:collapse\" align=\"center\">";
     str += "<tr><td style=\"color:#ffffff; background-color:#e097d9; text-align:center;\">rank<\/td><td style=\"color:#ffffff; background-color:#e097d9; text-align:center;\">options<\/td><\/tr>";

     for (i = 0; i < voteNamMember.length; i++) {
     	var index = voteMembers[0][i];
     	var score = maxVoteScore - trueRank + 1;
		voteNamMemberResult[index].rank = ranking;
     	if (rankScoreCal[ranking] == null) {
     		rankScoreCal[ranking] = score;
     		rankSizeCal[ranking] = 1;
     	} else {
     		rankScoreCal[ranking] += score;
     		rankSizeCal[ranking] += 1;
     	}
         str += "<tr>";
         str += "<td style=\"border:1px solid #000; text-align:center; padding-right:5px;\">" + ranking + "<\/td>";
         str += "<td style=\"border:1px solid #000; padding-left:5px;\">";
         str += voteNamMember[index].name + "<\/td><\/tr>";
         if (i < voteNamMember.length - 1) {
             if (voteEqual[index] == voteMembers[0][i + 1]) {
                 sameRank++;
                 trueRank++;
             } else {
                 ranking += sameRank;
                 trueRank++;
                 sameRank = 1;
             }
         }
     }

	voteNamMemberResult = voteNamMemberResult.map( r => {
		r.score = rankScoreCal[r.rank]/rankSizeCal[r.rank];
		return r;
	});

     str += "<\/table>";
     document.getElementById("voteResultField").innerHTML = str;
     $(document.getElementById('submitRank')).show();
 }



 //Indicates two elements to compare+++++++++++++++++++++++++++++++++++

 function buildVoteImage(n) {
 	var name = "" + toNameFace(n);
 	var url = "" + toUrlFace(n);
 	var str = "";
    str += "<div class=''>";
	str += "<div class='' title='"+ name +"'>";
	str += "<p><b>"+ name + "</b></p>";
	str += "<span class='vote-preview-hax'></span>";
	str += "<img class='vote-preview' src='"+ url +"'>";
	str += "</div>";
	str += "</div>";
	return str;
 }

 function showVoteImage() {
     var str0 = "battle #" + numQuestion + "<br>" + Math.floor(voteFinishSize * 100 / voteTotalSize) + "% sorted.";
     var str1 = buildVoteImage(voteMembers[voteCmp1][voteHead1]);
     var str2 = buildVoteImage(voteMembers[voteCmp2][voteHead2]);

     document.getElementById("voteBattleNumber").innerHTML = str0;
     document.getElementById("voteLeftField").innerHTML = str1;
     document.getElementById("voteRightField").innerHTML = str2;
     numQuestion++;
 }



 //Convert numeric value into a name (emoticon)+++++++++++++++++++++++++++++++
 function toUrlFace(n) {
	var str = voteNamMember[n].url;
	return str;
 }

 function toNameFace(n) {
     var str = voteNamMember[n].name;
     /*
      
     str += '<br />';
      
     switch(n) {
      
     //case -1 Because it is a sample, delete it
      
     case -1: str+=""; break;
      
     }*/

     return str;

 }