const mailchimp = require("@mailchimp/mailchimp_marketing");
const apiKey = process.env.MAILCHIMP_API_KEY;
const listID = process.env.MAILCHIMP_LIST_ID;

exports.handler = async function (event) {
    try {
        mailchimp.setConfig({
            apiKey,
            server: "us20",
        });
        const { email, firstName } = JSON.parse(event.body);
        const res = await mailchimp.lists.addListMember(listID, {
            email_address: email,
            status: "pending",
            merge_fields: {
                FNAME: firstName,
            },
        });
        return {
            statusCode: 200,
            body: JSON.stringify({ signUpEmail: res.email_address }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body:
                e.response?.text ||
                JSON.stringify({ error: "Error adding email" }),
        };
    }
};
