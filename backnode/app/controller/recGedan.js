"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController = require('./BaseController');
class RecGedan extends BaseController {
    async index() {
        const { ctx, service } = this;
        const { id = 'rec', pn = 5, rn = 1 } = ctx.query;
        const res = await service.recGedan.index({ id, pn, rn });
        ctx.body = res;
    }
}
exports.default = RecGedan;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjR2VkYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWNHZWRhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBRWxELE1BQXFCLFFBQVMsU0FBUSxjQUFjO0lBQ2xELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDN0IsTUFBTSxFQUFFLEVBQUUsR0FBRyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUNoRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ3hELEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFBO0lBQ2hCLENBQUM7Q0FDRjtBQVBELDJCQU9DIn0=