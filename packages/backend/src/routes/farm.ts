import { Router } from "express";
import {
  criarNovaFazenda,
  obterFazenda,
  plantarParcela,
  colherParcela,
  listarFazendas,
  comprarItem,
} from "../controllers/farmController";

const router = Router();

router.get("/", listarFazendas);
router.post("/", criarNovaFazenda);
router.get("/:id", obterFazenda);
router.post("/:id/parcela/:parcelaId/plantar", plantarParcela);
router.post("/:id/parcela/:parcelaId/colher", colherParcela);
router.post("/:id/comprar", comprarItem);

export default router;
